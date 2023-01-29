import React from 'react';

import ElementItem from './ElementItem'

import '../../static/styles/createInterior/elementList.css';

const ElementList = function ({setcreateObject, elements}) {
	return(
		<div className="mainElements">
			<h2>Elements</h2>
			<div className="elementList">
				{elements.map(element => 
					<ElementItem setcreateObject={setcreateObject} element={element} key={element.Id}/>
				)}
			</div>
		</div>
	)
}

export default ElementList