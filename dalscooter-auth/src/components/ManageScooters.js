import React from 'react';

const ManageScooters = () => {
  const containerStyle = {
    padding: '2rem',
    maxWidth: '1000px',
    margin: '0 auto',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
  };

  const sectionStyle = {
    marginBottom: '2rem',
  };

  const buttonStyle = {
    marginRight: '10px',
    padding: '10px 16px',
    backgroundColor: '#1a56db',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
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
      <h2>Manage Scooters</h2>
      <p>Add, update, or remove scooters from your inventory.</p>

      <div style={sectionStyle}>
        <button style={buttonStyle}>Add New Scooter</button>
        <button style={buttonStyle}>Update Scooter Info</button>
        <button style={buttonStyle}>Remove Scooter</button>
      </div>

      <div>
        <h3>Current Scooter Inventory</h3>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={headerStyle}>ID</th>
              <th style={headerStyle}>Model</th>
              <th style={headerStyle}>Status</th>
              <th style={headerStyle}>Battery</th>
              <th style={headerStyle}>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={thtdStyle}>SC-1001</td>
              <td style={thtdStyle}>GyroX-300</td>
              <td style={thtdStyle}>Available</td>
              <td style={thtdStyle}>87%</td>
              <td style={thtdStyle}>
                <button style={buttonStyle}>Edit</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageScooters;
