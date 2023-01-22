import React from 'react';

const Header = function ({setShowLogin}) {
	return(
		<header>
			<h1>Interior House</h1>
			<button onClick={()=>{setShowLogin(true)}}>Login</button>
			<button>Register</button>
		</header>
	)
}

export default Header;