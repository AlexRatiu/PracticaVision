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
    textAlign: 'center',
    fontSize: '3rem',
    marginBottom: '90px',
    color: '#FFFFFF', 
    textShadow: '0 0 10px rgba(255, 0, 0, 0.8), 0 0 20px rgba(255, 127, 0, 0.8), 0 0 30px rgba(255, 255, 0, 0.8), 0 0 40px rgba(0, 255, 0, 0.8), 0 0 50px rgba(0, 0, 255, 0.8), 0 0 60px rgba(75, 0, 130, 0.8), 0 0 70px rgba(238, 130, 238, 0.8)'
};



  const buttonStyle = {
    background: 'linear-gradient(to bottom right, #06402B, #90EE90)',
    border: '0',
    borderRadius: '12px',
    color: '#FFFFFF',
    cursor: 'pointer',
    display: 'inline-block',
    fontFamily: '-apple-system,system-ui,"Segoe UI",Roboto,Helvetica,Arial,sans-serif',
    fontSize: '16px',
    fontWeight: '500',
    lineHeight: '2.5',
    outline: 'transparent',
    padding: '0 1rem',
    textAlign: 'center',
    transition: 'box-shadow .2s ease-in-out',
    touchAction: 'manipulation',
    whiteSpace: 'nowrap',
    boxShadow: 'none'
  };

  const buttonHoverStyle = {
    boxShadow: '0 0 .25rem rgba(0, 255, 0, 0.5), -.125rem -.125rem 1rem rgba(34, 139, 34, 0.5), .125rem .125rem 1rem rgba(0, 128, 0, 0.5)'
};

  return React.createElement(
    'div',
    { style: containerStyle },
    React.createElement('h1', { style: headingStyle }, 'Welcome to the Drinks App'),
    React.createElement('button', {style: buttonStyle, onMouseOver: (e) => e.target.style.boxShadow = buttonHoverStyle.boxShadow, onMouseOut: (e) => e.target.style.boxShadow = buttonStyle.boxShadow, onClick : () => window.location.href = '/drinks'}, 'Go to Drinks List')
  );
}

export default Home;
