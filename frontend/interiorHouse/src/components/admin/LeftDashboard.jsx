import React from 'react';
import { Link } from 'react-router-dom';

import '../../static/styles/admin/leftDashboard.css';

const Admin = function () {
	return(
		<div className="leftDashboard">
			<Link className="link" to="/admin/models">Models</Link>
        </div>
	)
}


export default Admin;

// 5 
// 2 
// 3 