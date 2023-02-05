import React from 'react';

import ElementItem from './ElementItem'

import '../../static/styles/changeInterior/elementList.css';

const ElementList = function ({showElements, groupObjects, setcreateObject, elements}) {
	return(
		<div style={{display:showElements}} className="mainElements" >
			<h2>Elements</h2>
			<div className="elementList">
				{elements.map(element => 
					<ElementItem groupObjects={groupObjects} setcreateObject={setcreateObject} element={element} key={element.Id}/>
				)}
			</div>
		</div>
	)
}

export default ElementList