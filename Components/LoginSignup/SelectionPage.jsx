import React from 'react';
import './SelectionPage.css';
import { Link } from 'react-router-dom';
import DataContainer from './DataContainer'; // Import the new component
import video from '../Assets/video.mp4';

function Selection() {

  document.body.style = 'background: linear-gradient(#F9AC16, #E9CBAC, #F16A41);';
  return (
    <div className="App">
      <header className="App-header">
        <div className="welcome-section">
          <h1>Discover Dishes!</h1>
          <p>How would you like to have your Responses?</p>
        </div>
        {/* <div className="actions">
        <Link to="/"><button>Home</button></Link>
        <Link to="/login"><button>Login</button></Link>
        <Link to="/aboutus"><button>About Us</button></Link>
        </div> */}
        <div className="action-section">
          <Link to="/homelong">
            <button className="get-started-button">Recommend me in Advanced</button>
          </Link>
        </div>

        <div className="action-section">
          <Link to="/homeshort">
            <button className="get-started-button">Recommend me Quickly</button>
          </Link>
        </div>
      </header>

      {/* Render the video instead of the scrolling container */}
      <div className="video-container">
      <video controls autoPlay loop muted>
  <source src={video} type="video/mp4" />
</video>

      </div>
    </div>
  );
}

export default Selection;
