import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return React.createElement(
    'div',
    null,
    React.createElement('h1', null, 'Welcome to the Drinks App'),
    React.createElement(Link, { to: '/drinks' }, 'Go to Drinks List')
  );
}

export default Home;
