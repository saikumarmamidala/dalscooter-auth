import React from 'react';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const { isAuthenticated, user, handleLogout } = useAuth();

  return (
    <nav className="bg-blue-600 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-xl font-bold">DALScooter</div>
        <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            <>
              <span>Welcome, {user?.name}</span>
              <button 
                onClick={handleLogout}
                className="bg-white text-blue-600 px-4 py-1 rounded hover:bg-gray-100"
              >
                Logout
              </button>
            </>
          ) : (
            <span>Guest User</span>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;