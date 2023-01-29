import React from 'react';

const InteriorItem = function ({interior}) {
	return(
		<div className="interiorItem">
			<h1>{ interior.File }</h1>
		</div>
	)
}

export default InteriorItem;