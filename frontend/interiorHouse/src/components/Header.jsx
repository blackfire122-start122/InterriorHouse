import React from 'react';

import '../static/styles/Header.css';

const Header = function ({rightNav,setRightNav}) {
	function setRightNavClick(){
		setRightNav(!rightNav)
	}
	
	return(
		<header>
			<h1>Interior House</h1>
			<img src={require("../static/images/menu.png")} alt="menu" onClick={setRightNavClick} />
		</header>
	)
}

export default Header;