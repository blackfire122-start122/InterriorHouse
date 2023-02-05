import React, {lazy, Suspense, useState} from 'react';
import {Routes, Route } from 'react-router-dom';

import Main from './components/main/Main'
import Header from './components/Header'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import RightNav from './components/RightNav'
import User from './components/user/User'

import axios from 'axios';
import './static/styles/App.css';

axios.defaults.headers.post['Content-Type'] ='application/x-www-form-urlencoded';
const client = axios.create({
  baseURL: "http://localhost:8080/api/v1",
  withCredentials: true
  // while send on all request cokies 
})

const ChangeInterior = lazy(() => import('./components/changeInterior/ChangeInterior'))
const Admin = lazy(() => import('./components/admin/Admin'))

function App() {
    const [rightNav,setRightNav] = useState(false)

    return (
        <div className="App">
            <Header rightNav={rightNav} setRightNav={setRightNav} />
            {rightNav ? <RightNav /> : null}
            <Routes>
                <Route path='/' element={<Main client={client} />}></ Route>
                <Route path='/login' element={<Login client={client} />}></ Route>
                <Route path='/register' element={<Register client={client} />}></ Route>
                <Route path='/ChangeInterior' element={
                    <Suspense fallback={<div>Loading...</div>}>
                        <ChangeInterior client={client} />
                    </Suspense>}>
                </ Route>
                <Route path='/user' element={<User client={client} />}></ Route>
                <Route path='/admin' element={
                    <Suspense fallback={<div>Loading...</div>}>
                        <Admin client={client} />
                    </Suspense>}>
                </ Route>
            </ Routes>
        </div>
    )
}

export default App;
