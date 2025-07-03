import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Step1 from './step1';
import Step2 from './step2';
import Step3 from './step3';

const Login = () => {
  const [step, setStep] = useState(1);
  const [sessionId, setSessionId] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { 
    handleLoginStep1, 
    handleLoginStep2, 
    handleLoginStep3, 
    getSecurityQuestion, 
    getCaesarChallenge,
    isAuthenticated
  } = useAuth();

  if (isAuthenticated) {
    navigate('/dashboard');
    return null;
  }

  const handleStep1Complete = async (email, password) => {
    try {
      const response = await handleLoginStep1(email, password);
      setSessionId(response.sessionId);
      setStep(2);
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleStep2Complete = async (sessionId, securityAnswer) => {
    try {
      await handleLoginStep2(sessionId, securityAnswer);
      setStep(3);
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleStep3Complete = async (sessionId, caesarAnswer) => {
    try {
      await handleLoginStep3(sessionId, caesarAnswer);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleBackStep2 = () => {
    setStep(1);
    setError(null);
  };

  const handleBackStep3 = () => {
    setStep(2);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {step === 1 && (
        <Step1 
          onNext={handleStep1Complete} 
          error={error}
          setError={setError}
        />
      )}
      {step === 2 && (
        <Step2 
          sessionId={sessionId}
          onNext={handleStep2Complete}
          onBack={handleBackStep2}
          error={error}
          setError={setError}
          getSecurityQuestion={getSecurityQuestion}
        />
      )}
      {step === 3 && (
        <Step3 
          sessionId={sessionId}
          onComplete={handleStep3Complete}
          onBack={handleBackStep3}
          error={error}
          setError={setError}
          getCaesarChallenge={getCaesarChallenge}
        />
      )}
    </div>
  );
};

export default Login;