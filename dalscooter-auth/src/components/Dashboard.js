import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { USER_TYPES } from '../utils/constants';
 import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useAuth();

  const renderCustomerDashboard = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold">Customer Dashboard</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h4 className="font-medium mb-2">Book a Scooter</h4>
          <p className="text-gray-600">Reserve an e-bike or gyrocopter scooter for your daily needs.</p>
          <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Book Now
          </button>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h4 className="font-medium mb-2">Your Bookings</h4>
          <p className="text-gray-600">View and manage your current and past bookings.</p>
          <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            View Bookings
          </button>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h4 className="font-medium mb-2">Provide Feedback</h4>
          <p className="text-gray-600">Share your experience with our scooters and services.</p>
          <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Give Feedback
          </button>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h4 className="font-medium mb-2">Virtual Assistant</h4>
          <p className="text-gray-600">Get help with navigation, bookings, and more.</p>
          <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Open Chat
          </button>
        </div>
      </div>
    </div>
  );

  const renderFranchiseDashboard = () => (
   

<div className="space-y-6">
  <h3 className="text-xl font-semibold">Franchise Operator Dashboard</h3>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  
   
    <div className="bg-white p-6 rounded-lg shadow">
      <h4 className="font-medium mb-2">Manage Scooters</h4>
      <p className="text-gray-600">Add, update, or remove scooters from your inventory.</p>
      <Link to="/manage-scooters">
        <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Scooter Management
        </button>
      </Link>
    </div>

   
    <div className="bg-white p-6 rounded-lg shadow">
      <h4 className="font-medium mb-2">View Bookings</h4>
      <p className="text-gray-600">See all current and upcoming bookings for your scooters.</p>
      <Link to="/view-bookings">
        <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          View All Bookings
        </button>
      </Link>
    </div>

    
    <div className="bg-white p-6 rounded-lg shadow">
      <h4 className="font-medium mb-2">Customer Support</h4>
      <p className="text-gray-600">Respond to customer inquiries and support tickets.</p>
       <Link to="/support-center">
      <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Support Center
      </button>
      </Link>
    </div>

   
    <div className="bg-white p-6 rounded-lg shadow">
      <h4 className="font-medium mb-2">Reports & Analytics</h4>
      <p className="text-gray-600">View performance metrics and customer feedback.</p>
      <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        View Reports
      </button>
    </div>
    
  </div>
</div>

  );

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Welcome to DALScooter</h2>
      {user?.userType === USER_TYPES.CUSTOMER ? renderCustomerDashboard() : renderFranchiseDashboard()}
    </div>
  );
};

export default Dashboard;