import React, {useState, useEffect} from 'react';

import Header from './components/Header'
import HouseList from './components/HouseList'

import axios from 'axios';
import './styles/App.css';

function App() {
  const [houses,setHouses] = useState([])

  async function fetchHouse() {
    const response = await axios.get("http://localhost:8080/api/v1/houses")
    setHouses(response.data)
  }

  useEffect(() => {
    fetchHouse()
  }, [])

  return (
    <div className="App">
      <Header/>
      <HouseList houses={houses} />
    </div>
  );
}

export default App;
