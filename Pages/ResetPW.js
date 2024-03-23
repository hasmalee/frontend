import React, { useState } from 'react';
import '../Components/LoginSignup/LoginSignup.css';
import password_icon from '../Components/Assets/password.png';


const ResetPW = () => {
  const [action, setAction] = useState("Login");
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    const url = 'http://127.0.0.1:5000/api/signup'; // This should match the backend endpoint
    const payload = {password:password };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Signup successful', data);
        // Handle successful signup here (like redirect to another page)
      } else {
        console.error('Signup failed', await response.text());
        // Handle errors or unsuccessful signup here
      }
    } catch (error) {
      console.error('Failed to send data to the backend', error);
      // Handle network errors or other exceptions here
    }
  };

  return (
    <div className='container'>
      <div className='header'>    
        <div className="text">Reset Password</div>
        <div className="underline"></div>
      </div>
      <form onSubmit={handleSubmit} className="inputs">
        <div className="input">
          <img src={password_icon} alt="" />
          <input type="password" placeholder='Enter the new Password' value={password} onChange={e => setPassword(e.target.value)} />
        </div>
        <button type="submit" className="submit">Reset Password</button>
      </form>
    </div>
  );
}

export default ResetPW;
