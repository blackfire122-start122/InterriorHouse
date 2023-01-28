import React from 'react'
import '../static/styles/HouseItem.css'

const Header = function ({house}) {
	return(
		<div className="house">
			<img className="imgHouse" src={house.Image} alt={house.Name+" image"}/>
			<h1 className="houseName">{house.Name}</h1>		
		</div>
	)
}

export default Header;
