import React, { useState } from 'react';
import '../Components/LoginSignup/LoginSignup.css';
import email_icon from '../Components/Assets/email.png';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const handleChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = () => {
    // Send the email value to the backend
    fetch('/reset-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    })
      .then((response) => {
        if (response.ok) {
          // Reset the email field after successful submission
          setEmail('');
          alert('Password reset instructions sent to your email.');
        } else {
          // Handle error
          alert('Failed to reset password. Please try again.');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('An error occurred while resetting the password.');
      });
  };

  return (
    <div className='container'>
      <div className='header'>
        <div className="text">Forgot Password</div>
        <div className="underline"></div>
      </div>

      <div className="input">
        <img src={email_icon} alt="" />
        <input
          type="email"
          placeholder="Email"
          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
          title="Please enter a valid email address"
          value={email}
          onChange={handleChange}
          
        />
      </div>

      <div className="submit-container">
        <div className="submit" onClick={handleSubmit}>Reset Password</div>
      </div>
    </div>
  );
};

export default ForgotPassword;
