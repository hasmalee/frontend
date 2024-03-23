import React from 'react';
import './HomeBase.css'; 
import chatbot from '../Components/Assets/chatbot.png';
import { Link } from 'react-router-dom';

document.body.style = 'background: linear-gradient(#F9AC16, #E9CBAC, #F16A41);';
function HomeBase() {
  return (
    <div className="App">
      <header className="App-header">
        <nav>
        <Link to="/login"><button>Login</button></Link>
        <Link to="/signup"> <button>Sign Up</button> </Link>
        <Link to="/aboutus"> <button>About Us</button> </Link>
        </nav>
        <div className="welcome-section">
          <h1>WELCOME </h1>
          <h1>TO FLAVOUR</h1>
          <h1>CRAFT !</h1>
          <p>Where Flavours Mix Together</p>
        </div>
        <div className="action-section">
          {/* <button className="get-started-button">Get Started</button> */}
          <Link to="/signup"> <button className="get-started-button">Get Started</button> </Link>
        </div>
        <div className="robot-with-pizza-home">
        <img src={chatbot} alt="Robot with Pizza" class="robot-home-image"/>
        </div>
      </header>
    </div>
  );
}

export default HomeBase;