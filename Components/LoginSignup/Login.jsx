import React, { useState } from 'react';
// import { useHistory } from 'react-router-dom';
import './LoginSignup.css';
import email_icon from '../Assets/email.png';
import password_icon from '../Assets/password.png';
import loginimg from '../Assets/signup.jpg';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // State to hold error message
  // const history = useHistory(); // Initialize useHistory hook

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior
  
    const url = 'https://backend-oy0f.onrender.com'; // Correct backend endpoint
    const payload = { email, password };             
  
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
  
      const responseData = await response.json(); // Parse response data

      if (response.ok) { // Check status code directly
        console.log('Login successful', responseData);
        setError('');
        window.location.href = '/select'; 
     // Clear previous error messages
                         
       
        // Redirect to another page after successful login
        // history.push('/AboutUs'); // Uncomment this line if using useHistory
      } else {
        setError(responseData.error); // Set error message
        console.error('Login failed', responseData.error);
        window.location.href = '/login';                                      
        // Handle errors or unsuccessful login here
      }
    } catch (error) {
      console.error('Failed to send data to the backend', error);
      // Handle network errors or other exceptions here
      setError('Failed to connect to the server'); // Set custom error message
      window.location.href = '/login';                   
    }
  };
  
  return (
    <div>
    <div className='container'>
      <div className='header'>    
        <div className="text">Login</div>
        <div className="underline"></div>
      </div>
      <form onSubmit={handleSubmit} className="inputs">
        <div className="input">
          <img src={email_icon} alt="" />
          <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        </div>
        <div className="input">
          <img src={password_icon} alt="" />
          <input type="password" placeholder='Password' value={password} onChange={e => setPassword(e.target.value)} />
        </div>
        <button type="submit" className="submit1">Login</button>
      </form>
      {error && <div className="error">{error}</div>} {/* Display error message */}
      <div className="forgot-password"><span><a href='forgotpassword'>Forgot password?</a></span></div>
    </div>
    <div className="robot-with-pizza">
        <img src={loginimg} alt="Robot with Pizza" class="robot-image"/>
    </div>
  </div>
  );
}

export default Login;
