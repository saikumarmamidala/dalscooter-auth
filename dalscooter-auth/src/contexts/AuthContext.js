import React, { createContext, useContext, useState, useEffect } from 'react';
import { getCurrentUser, getSession, logout } from '../services/auth';
import api from '../services/api';
import { AUTH_STEPS, USER_TYPES } from '../utils/constants';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    isLoading: true,
    user: null,
    sessionId: null,
    currentStep: AUTH_STEPS.STEP1,
    error: null
  });

  const checkAuth = async () => {
    try {
      const user = getCurrentUser();
      if (!user) {
        setAuthState(prev => ({
          ...prev,
          isAuthenticated: false,
          isLoading: false,
          user: null
        }));
        return;
      }

      const session = await getSession();
      const userData = await getUserData();

      setAuthState(prev => ({
        ...prev,
        isAuthenticated: true,
        isLoading: false,
        user: userData,
        sessionId: session.getIdToken().getJwtToken()
      }));
    } catch (error) {
      setAuthState(prev => ({
        ...prev,
        isAuthenticated: false,
        isLoading: false,
        user: null,
        error: error.message
      }));
    }
  };

  const getUserData = async () => {
    try {
      const user = getCurrentUser();
      if (!user) return null;

      const session = await getSession();
      const payload = session.getIdToken().decodePayload();

      return {
        email: payload.email,
        userId: payload['custom:user_id'],
        userType: payload['custom:user_type'] || USER_TYPES.CUSTOMER,
        name: payload.name
      };
    } catch (error) {
      console.error('Error getting user data:', error);
      return null;
    }
  };

  const handleLoginStep1 = async (email, password) => {
    try {
      const response = await api.post('/auth', {
        action: 'login_step1',
        email,
        password
      });

      setAuthState(prev => ({
        ...prev,
        sessionId: response.sessionId,
        currentStep: AUTH_STEPS.STEP2,
        error: null
      }));

      return response;
    } catch (error) {
      setAuthState(prev => ({
        ...prev,
        error: error.message
      }));
      throw error;
    }
  };

  const handleLoginStep2 = async (sessionId, securityAnswer) => {
    try {
      const response = await api.post('/auth', {
        action: 'login_step2',
        sessionId,
        securityAnswer
      });

      setAuthState(prev => ({
        ...prev,
        currentStep: AUTH_STEPS.STEP3,
        error: null
      }));

      return response;
    } catch (error) {
      setAuthState(prev => ({
        ...prev,
        error: error.message
      }));
      throw error;
    }
  };

  const handleLoginStep3 = async (sessionId, caesarAnswer) => {
    try {
      const response = await api.post('/auth', {
        action: 'login_step3',
        sessionId,
        caesarAnswer
      });

      if (response.fullyAuthenticated) {
        const userData = await getUserData();

        setAuthState({
          isAuthenticated: true,
          isLoading: false,
          user: userData,
          sessionId: response.sessionId,
          currentStep: AUTH_STEPS.COMPLETE,
          error: null
        });
      }

      return response;
    } catch (error) {
      setAuthState(prev => ({
        ...prev,
        error: error.message
      }));
      throw error;
    }
  };

  const getSecurityQuestion = async (sessionId) => {
    try {
      const response = await api.post('/auth', {
        action: 'get_security_question',
        sessionId
      });
      return response.securityQuestion;
    } catch (error) {
      throw error;
    }
  };

  const getCaesarChallenge = async (sessionId) => {
    try {
      const response = await api.post('/auth', {
        action: 'get_caesar_challenge',
        sessionId
      });
      return response;
    } catch (error) {
      throw error;
    }
  };

  const handleRegister = async (userData) => {
    try {
      const response = await api.post('/register', userData);
      return response;
    } catch (error) {
      setAuthState(prev => ({
        ...prev,
        error: error.message
      }));
      throw error;
    }
  };

  const handleLogout = () => {
    logout();
    setAuthState({
      isAuthenticated: false,
      isLoading: false,
      user: null,
      sessionId: null,
      currentStep: AUTH_STEPS.STEP1,
      error: null
    });
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        handleLoginStep1,
        handleLoginStep2,
        handleLoginStep3,
        getSecurityQuestion,
        getCaesarChallenge,
        handleRegister,
        handleLogout,
        checkAuth
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};