import React from 'react';
import { Link } from 'react-router-dom';

import '../styles/Header.css';

const Header = function ({rightNav,setRightNav}) {
	function setRightNavClick(){
		setRightNav(!rightNav)
	}
	
	return(
		<header>
			<h1>Interior House</h1>
			<button onClick={setRightNavClick}></button>
		</header>
	)
}

export default Header;