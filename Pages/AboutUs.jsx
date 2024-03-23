// AboutTeamPage.js

import React from 'react';
import './AboutUs.css';
import Hasmalee from '../Components/Assets/ProfilePics/Hasmalee.jpg';
import Himath from '../Components/Assets/ProfilePics/Himath.jpg';
import Maleesha from '../Components/Assets/ProfilePics/Maleesha.jpg';
import Ruwin from '../Components/Assets/ProfilePics/Ruwin.jpg';
import Sharon from '../Components/Assets/ProfilePics/Sharon.jpg'


const AboutUs = () => {
  const teamMembers = [
    { name: 'Himath Malwaththa', position: 'Developer', imageUrl: Himath},
    { name: 'Hasmalee Vidanya', position: 'Developer', imageUrl: Hasmalee},
    { name: 'Maleesha Elvitigala', position: 'Developer', imageUrl: Maleesha},
    { name: 'Sharon Silva', position: 'Developer', imageUrl: Sharon},
    { name: 'Ruwin Dissanayake', position: 'Developer', imageUrl: Ruwin},
  ];
  document.body.style = 'background: linear-gradient(#F9AC16, #E9CBAC, #F16A41);';
  return (
    <div className="about-team-page">
      <h1>Our Team</h1>
      <div className="team-members">
        {teamMembers.map((member, index) => (
           <div key={index} className={`team-member ${member.position.toLowerCase() === 'developer' ? 'developer' : ''}`}>
            <img src={member.imageUrl} alt={member.name} className="member-image" />
            <h2>{member.name}</h2>
            <p>{member.position}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutUs;
