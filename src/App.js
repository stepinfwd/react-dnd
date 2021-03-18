import "./App.css";
import React, { useState, useEffect } from 'react'

import SingleResume from "./SingleResume";
import {initialData} from "./data"
function App() {
  const [resume, setResume] = useState(initialData.record);

  return (
    <div className="App">
   {resume.map((item, index) => (
        <SingleResume key={index} resume={item} />
      ))}    </div>
  );
}

export default App;
