import React from 'react';
import './App.scss';
import Home from './home/Home';
import Header from './header/Header';
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Home></Home>
        <Header></Header>
      </div>
    </Router>
  );
}

export default App;
