import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Drinks from './components/Drinks';

function App() {
  return React.createElement(
    Router,
    null,
    React.createElement(
      Routes,
      null,
      React.createElement(Route, { path: '/', element: React.createElement(Home) }),
      React.createElement(Route, { path: '/drinks', element: React.createElement(Drinks) })
    )
  );
}

export default App;
