import React from 'react';
import logo from './logo.svg';
import './App.css';

import Home from './pages/Home';
import Matchups from './pages/Matchups';
import Prediction from './pages/Prediction';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/matchups" element={<Matchups/>} />
          <Route path="/predictions" element={<Prediction/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
