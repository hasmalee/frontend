
import React from 'react';
import '../LoginSignup/SelectionPage.css'

const DataContainer = ({ data }) => {
  return (
    <div className="scroll-container">
      <h2>Here are the location list you can search for</h2>
      <ul>
        {data.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default DataContainer;
