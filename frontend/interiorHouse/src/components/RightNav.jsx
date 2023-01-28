import React from 'react';
import { Link } from 'react-router-dom';

import '../static/styles/RightNav.css'

const RightNav = function () {
	return(
		<div className="RightNav">
			<h2>Navigations</h2>
			<div className="links">
				<Link className="link" to='/'>Home</Link>
				<Link className="link" to='/login'>Login</Link>
				<Link className="link" to='/register'>Register</Link>
				<Link className="link" to='/CreateInterior'>CreateInterior</Link>
			</div>
		</div>
	)
}

export default RightNav;