import React, { useState } from 'react';
import './LoginSignup.css';
import email_icon from '../Assets/email.png';
import user_icon from '../Assets/person.png';
import password_icon from '../Assets/password.png';
import loginimg from '../Assets/login.jpg'; 

const LoginSignup = () => {
  const [action, setAction] = useState("Login");
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null); // State to hold error message

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    const url = 'http://127.0.0.1:5000/api/signup'; // This should match your backend endpoint
    const payload = { username: userName, email, password };

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
        window.location.href = '/login';
        // Handle successful signup here (like redirect to another page)
      } else {
        const errorData = await response.json(); // Parse error response
        setError(errorData.error); // Set error message
        console.error('Signup failed', errorData.error);
        window.location.href = '/signup';
        // Handle errors or unsuccessful signup here
      }
    } catch (error) {
      console.error('Failed to send data to the backend', error);
      window.location.href = '/signup';
      // Handle network errors or other exceptions here
    }
  };


document.body.style = 'background: linear-gradient(#F9AC16, #E9CBAC, #F16A41);';
  return (
    <div>
    <div className='container'>
      <div className='header'>    
        <div className="text">Sign Up</div>
        <div className="underline"></div>
      </div>
      <form onSubmit={handleSubmit} className="inputs">
        <div className="input">
          <img src={user_icon} alt="" />
          <input type="text" placeholder='Name' value={userName} onChange={e => setUserName(e.target.value)} />
        </div>
        <div className="input">
          <img src={email_icon} alt="" />
          <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        </div>
        <div className="input">
          <img src={password_icon} alt="" />
          <input type="password" placeholder='Password' value={password} onChange={e => setPassword(e.target.value)} />
        </div>
        {error && <div className="error">{error}</div>} {/* Display error message */}
        <button type="submit" className="submit">Sign Up</button>
      </form>
    </div>
    <div className="robot-with-pizza">
    <img src={loginimg} alt="Robot with Pizza" class="robot-image"/>
  </div>
</div>
  );
}

export default LoginSignup;
