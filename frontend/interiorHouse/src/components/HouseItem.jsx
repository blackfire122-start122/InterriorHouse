import React from 'react';

const Header = function ({house}) {
	console.log(house)
	return(
		<div className="house">
			<h1>{house.Name}</h1>		
			<img className="imgHouse" src={house.Image} alt={house.Name+" image"}/>
		</div>
	)
}

export default Header;
