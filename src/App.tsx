import React from 'react';
import { Routes, Route } from 'react-router-dom'
import './App.css';

function App() {
  return (
    <div className="App">

      <Routes>
        <Route path="/landing" element={""}/>
        <Route path="/signup" element={""}/>
        <Route path="/disqualified" element={""}/>
      </Routes>
    </div>
  );
}

export default App;
