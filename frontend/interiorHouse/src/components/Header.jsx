import React from 'react';

const Header = function ({setShowLogin,setShowRegister}) {
	return(
		<header>
			<h1>Interior House</h1>
			<button onClick={()=>{setShowLogin(true);setShowRegister(false)}}>Login</button>
			<button onClick={()=>{setShowRegister(true);setShowLogin(false)}}>Register</button>
		</header>
	)
}

export default Header;