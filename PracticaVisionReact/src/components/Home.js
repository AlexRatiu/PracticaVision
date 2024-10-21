import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f0f8ff',
    textAlign: 'center',
  };

  const headingStyle = {
    fontSize: '3rem',
    color: '#333',
    marginBottom: '20px',
  };

  const linkStyle = {
    padding: '10px 20px',
    fontSize: '1.2rem',
    color: 'white',
    backgroundColor: '#4CAF50',
    border: 'none',
    borderRadius: '5px',
    textDecoration: 'none',
    transition: 'background-color 0.3s ease',
  };

  const linkHoverStyle = {
    backgroundColor: '#45a049',
  };

  return React.createElement(
    'div',
    { style: containerStyle },
    React.createElement('h1', { style: headingStyle }, 'Welcome to the Drinks App'),
    React.createElement(Link, { to: '/drinks', style: linkStyle, onMouseOver: (e) => e.target.style.backgroundColor = linkHoverStyle.backgroundColor, onMouseOut: (e) => e.target.style.backgroundColor = linkStyle.backgroundColor }, 'Go to Drinks List')
  );
}

export default Home;
