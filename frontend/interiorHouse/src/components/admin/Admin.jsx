import React from 'react';
import { Routes, Route } from 'react-router-dom';

import LeftDashboard from './LeftDashboard'
import Models from './Models'

import '../../static/styles/admin/admin.css';

const Admin = function ({client}) {
	
	return(
		<div className="Admin">
			<LeftDashboard/>
			<Routes>
            	<Route path={'/models/*'} element={<Models client={client} />}></ Route>
            </ Routes>
        </div>
	)
}


export default Admin;
