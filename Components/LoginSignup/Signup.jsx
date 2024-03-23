import React, { useState } from 'react';
import './LoginSignup.css';
import email_icon from '../Assets/email.png';
import user_icon from '../Assets/person.png';
import password_icon from '../Assets/password.png';

const Signup = () => {
  const [action, setAction] = useState("Sign Up");
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async () => {
    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: name,
          email: email,
          password: password
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Signup successful', data);
        // Handle successful signup here (like redirect to home page)
      } else {
        const errorText = await response.text();
        console.error('Signup failed', errorText);
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
        <div className="text">{action}</div>
        <div className="underline"></div>
      </div>
      
      <div className="inputs">
        {action==="Login" ? 
          <div></div> : 
          <div className="input">
            <img src={user_icon} alt="" />
            <input 
              type="text" 
              placeholder='Name' 
              value={name} 
              onChange={(e) => setName(e.target.value)} />
          </div>
        }
        <div className="input">
          <img src={email_icon} alt="" />
          <input 
            type="email" 
            placeholder="Email" 
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" 
            title="Please enter a valid email address" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="input">
          <img src={password_icon} alt="" />
          <input 
            type="password" 
            placeholder='Password' 
            pattern=".{8,}" 
            title="Password must be at least 8 characters long" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} />
        </div>
      </div>

      {action==="Sign Up" ? 
        <div></div> : 
        <div className="forgot-password">
          <span><a href='forgotpassword'>Forgot password?</a></span>
        </div>
      }

      <div className="submit-container">
        <div 
          className={action==="Login" ? "submit gray" : "submit"} 
          onClick={() => {setAction("Sign Up")}}>
          Sign Up
        </div>
        <div 
          className={action==="Sign Up" ? "submit gray" : "submit"} 
          onClick={() => {setAction("Login")}}>
          Login
        </div>
      </div>

      <div className="btn2">
        <button type="submit" onClick={handleSubmit}>{action}</button>
      </div>
    </div>
  );
}

export default Signup;
