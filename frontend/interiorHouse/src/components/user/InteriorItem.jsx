import React from 'react';
import { Link } from 'react-router-dom';

const InteriorItem = function ({interior}) {
	return(
		<div className="interiorItem">
			<h1>{ interior.File }</h1>
			<Link className="link" to="/CreateInterior" state={{ interior: interior }}>CreateInterior</Link>
		</div>
	)
}

export default InteriorItem;