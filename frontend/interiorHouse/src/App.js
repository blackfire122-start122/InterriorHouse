import React, {useState, useEffect} from 'react';

import Header from './components/Header'
import HouseList from './components/HouseList'
import Login from './components/auth/Login'

import axios from 'axios';
import './styles/App.css';

axios.defaults.headers.post['Content-Type'] ='application/x-www-form-urlencoded';
const client = axios.create({
  baseURL: "http://localhost:8080/api/v1" 

})

function App() {
    const [houses,setHouses] = useState([])
    const [showLogin,setShowLogin] = useState(false)

    async function fetchHouse() {
        const response = await client.get("/houses")
        setHouses(response.data)
    }

    useEffect(() => {
        fetchHouse()
    }, [])

  return (
    <div className="App">
        <Header setShowLogin={setShowLogin} />
        <HouseList houses={houses} />
        { showLogin ? <Login client={client} setShowLogin={setShowLogin} /> : null }
    </div>
  )
}

export default App;
