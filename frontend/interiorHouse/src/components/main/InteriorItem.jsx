import React from 'react'
import '../../static/styles/main/InteriorItem.css'
import { Link } from 'react-router-dom';

const Header = function ({interior}) {
	return(
		<Link className="interior" to="/ChangeInterior" state={{ interior: interior }}>
			{/* full url for nginx*/}
			<img className="imgInterior" src={"http://localhost/"+interior.Image} alt={interior.Name+" image"}/>
			<h1 className="interiorName">{interior.Name}</h1>					
		</Link>
	)
}

export default Header;
