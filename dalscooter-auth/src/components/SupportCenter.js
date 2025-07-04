import React, { useState } from 'react';

const SupportCenter = () => {
  const [ticket, setTicket] = useState({
    bookingId: '',
    subject: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setTicket({ ...ticket, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Replace this with API call (e.g., to Lambda or backend endpoint)
    console.log('Submitted support ticket:', ticket);
    setSubmitted(true);
  };

  const containerStyle = {
    maxWidth: '600px',
    margin: '40px auto',
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    padding: '24px',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
    fontFamily: 'Arial, sans-serif',
  };

  const titleStyle = {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '10px',
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '6px',
    fontWeight: '600',
    color: '#333',
  };

  const inputStyle = {
    width: '100%',
    padding: '10px',
    marginBottom: '16px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '14px',
  };

  const textAreaStyle = {
    ...inputStyle,
    height: '120px',
    resize: 'vertical',
  };

  const buttonStyle = {
    backgroundColor: '#1a56db',
    color: '#fff',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '14px',
  };

  const successStyle = {
    backgroundColor: '#d4edda',
    color: '#155724',
    padding: '15px',
    borderRadius: '4px',
    fontSize: '15px',
    marginTop: '20px',
  };

  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>Customer Support Center</h2>
      <p style={{ marginBottom: '20px', color: '#555' }}>
        Submit inquiries or report issues related to your bookings.
      </p>

      {submitted ? (
        <div style={successStyle}>
          ✅ Your support request has been submitted successfully!
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            <label style={labelStyle}>Booking ID</label>
            <input
              type="text"
              name="bookingId"
              value={ticket.bookingId}
              onChange={handleChange}
              required
              style={inputStyle}
              placeholder="e.g., BKG-23456"
            />
          </div>

          <div>
            <label style={labelStyle}>Subject</label>
            <input
              type="text"
              name="subject"
              value={ticket.subject}
              onChange={handleChange}
              required
              style={inputStyle}
              placeholder="e.g., Scooter battery issue"
            />
          </div>

          <div>
            <label style={labelStyle}>Message</label>
            <textarea
              name="message"
              value={ticket.message}
              onChange={handleChange}
              required
              style={textAreaStyle}
              placeholder="Describe your issue..."
            />
          </div>

          <button type="submit" style={buttonStyle}>
            Submit Ticket
          </button>
        </form>
      )}
    </div>
  );
};

export default SupportCenter;
