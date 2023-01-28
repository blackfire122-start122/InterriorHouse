import React from 'react';
import { Link } from 'react-router-dom';

const Header = function () {
	return(
		<header>
			<h1>Interior House</h1>
			<Link to='/'>Home</Link>
			<Link to='/login'>Login</Link>
			<Link to='/register'>Register</Link>
			<Link to='/CreateInterior'>CreateInterior</Link>
		</header>
	)
}

export default Header;