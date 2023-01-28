import React, {useState} from 'react';
import {Routes, Route } from 'react-router-dom';

import Main from './components/Main'
import Header from './components/Header'
import CreateInterior from './components/CreateInterior'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import RightNav from './components/RightNav'

import axios from 'axios';
import './styles/App.css';

axios.defaults.headers.post['Content-Type'] ='application/x-www-form-urlencoded';
const client = axios.create({
  baseURL: "http://localhost:8080/api/v1" 

})

function App() {
    const [rightNavShow,setRightNavShow] = useState(false)

    return (
        <div className="App">
            <Header rightNavShow={rightNavShow} setRightNavShow={setRightNavShow} />
            {rightNavShow ? <RightNav /> : null}
            <Routes>
                <Route path='/' element={<Main client={client} />}></ Route>
                <Route path='/login' element={<Login client={client} />}></ Route>
                <Route path='/register' element={<Register client={client} />}></ Route>
                <Route path='/createInterior' element={<CreateInterior client={client} />}></ Route>
            </ Routes>
        </div>
    )
}

export default App;
