import React from 'react';

import Header from './components/Header'
import House from './components/House'

// import './App.css';
// import axios from 'axios';

// async function testPoint() {
  // const response = await axios.get("http://localhost:8080/api");
  // console.log(response.data)
// }

function App() {
  // testPoint()
  return (
    <div className="App">
      <Header/>

      <div>
        <House />
        <House />
        <House />
        <House />
      </div>

    </div>
  );
}

export default App;
