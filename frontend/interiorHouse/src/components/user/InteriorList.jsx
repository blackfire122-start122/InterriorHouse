import React from 'react';

import InteriorItem from './InteriorItem'


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