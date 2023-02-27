import React from 'react';
import InteriorItem from './InteriorItem'
import '../../static/styles/main/InteriorList.css';

const InteriorList = function ({client,interiors}) {
	return(
		<div className="interiorList">
			{interiors.map(interior => 
				<InteriorItem client={client} interior={interior} key={interior.Id}/>
			)}
		</div>
	)
}

export default InteriorList;