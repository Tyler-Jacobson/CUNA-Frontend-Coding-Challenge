import React from 'react';
import { Routes, Route } from 'react-router-dom'
import './App.css';
import Landing from './Components/Landing';
import Signup from './Components/Signup';
import Disqualified from './Components/Disqualified';

function App() {
  return (
    <div className="App">
      
      
        <Routes>
          <Route path="/" element={<Landing />}/>
          <Route path="/signup" element={<Signup />}/>
          <Route path="/disqualified" element={<Disqualified />}/>
        </Routes>
    </div>
  );
}

export default App;