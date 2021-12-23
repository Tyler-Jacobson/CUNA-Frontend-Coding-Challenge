import React from 'react';
import { Routes, Route } from 'react-router-dom'
import './App.css';
import Landing from './Components/Landing';
import Signup from './Components/Signup';
import Disqualified from './Components/Disqualified';
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";



function App() {
  const { control} = useForm()
  return (
    <div className="App">

      <DevTool control={control} />
      {/* Enable React-Hook-Form dev tools by uncommenting the line above  */}
      
        <Routes>
          <Route path="/" element={<Landing />}/>
          <Route path="/signup" element={<Signup />}/>
          <Route path="/disqualified" element={<Disqualified />}/>
        </Routes>
    </div>
  );
}

export default App;