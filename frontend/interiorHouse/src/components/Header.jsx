import React from 'react';
import '../styles/Header.css'

const Header = function ({rightNavShow,setRightNavShow}) {
	function setRightNavShowClick(){
		setRightNavShow(!rightNavShow)
	}
	return(
		<header>
			<h1>Interior House</h1>
			<button onClick={setRightNavShowClick}></button>
		</header>
	)
}

export default Header;