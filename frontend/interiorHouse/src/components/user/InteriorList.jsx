import React from 'react';

import InteriorItem from './InteriorItem'

import "./../../static/styles/user/InteriorList.css"

const InteriorList = function ({interiors}) {
	return(
	<div className="interiors">
		{interiors.map(interior => 
			<InteriorItem interior={interior} key={interior.Id} />
		)}
	</div>
	)
}

export default InteriorList;