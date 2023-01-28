import React from 'react'
import '../styles/HouseItem.css'

const Header = function ({house}) {
	return(
		<div className="house">
			<img className="imgHouse" src={house.Image} alt={house.Name+" image"}/>
			<h2 className="houseName">{house.Name}</h2>		
		</div>
	)
}

export default Header;
