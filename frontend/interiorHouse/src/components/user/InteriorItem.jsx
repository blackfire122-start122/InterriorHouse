import React from 'react';
import { Link } from 'react-router-dom';

import "./../../static/styles/user/InteriorItem.css"

const InteriorItem = function ({interior}) {
	return(
		<div className="interiorItem">
			{/* full url for nginx*/}
			<img className="imgInterior" src={"http://localhost/"+interior.Image} alt={interior.Name+"image"} />
			<div className="nameChangeInterior">
				<h1>{ interior.Name.slice(0,8) }</h1>
				<Link className="link" to="/ChangeInterior" state={{ interior: interior }}>Change</Link>
			</div>
		</div>
	)
}

export default InteriorItem;