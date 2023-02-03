import React from 'react';
import { Link } from 'react-router-dom';

const InteriorItem = function ({interior}) {
	return(
		<div className="interiorItem">
			<h1>{ interior.Name }</h1>
			<Link className="link" to="/ChangeInterior" state={{ interior: interior }}>Change Interior</Link>
		</div>
	)
}

export default InteriorItem;