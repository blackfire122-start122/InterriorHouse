import React from 'react';
import InteriorItem from './InteriorItem'
import '../../static/styles/main/InteriorList.css';

const InteriorList = function ({interiors}) {
	return(
		<div className="interiorList">
			{interiors.map(interior => 
				<InteriorItem interior={interior} key={interior.Id}/>
			)}
		</div>
	)
}

export default InteriorList;