import React from 'react';

const ViewBookings = () => {
  const containerStyle = {
    padding: '2rem',
    maxWidth: '1000px',
    margin: '0 auto',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
  };

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '1rem',
  };

  const thtdStyle = {
    border: '1px solid #ccc',
    padding: '10px',
    textAlign: 'left',
    backgroundColor: '#fff',
  };

  const headerStyle = {
    ...thtdStyle,
    backgroundColor: '#f1f1f1',
    fontWeight: 'bold',
  };

  return (
    <div style={containerStyle}>
      <h2>View All Bookings</h2>
      <p>See all current and upcoming bookings for your scooters.</p>

      <div>
        <h3>Booking Records</h3>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={headerStyle}>Booking ID</th>
              <th style={headerStyle}>Customer</th>
              <th style={headerStyle}>Scooter ID</th>
              <th style={headerStyle}>Date</th>
              <th style={headerStyle}>Duration</th>
              <th style={headerStyle}>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={thtdStyle}>BKG-23456</td>
              <td style={thtdStyle}>John Doe</td>
              <td style={thtdStyle}>SC-1001</td>
              <td style={thtdStyle}>2025-07-05</td>
              <td style={thtdStyle}>2 days</td>
              <td style={thtdStyle}>Confirmed</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewBookings;
