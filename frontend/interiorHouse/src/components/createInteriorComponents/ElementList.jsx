import React from 'react';

import ElementItem from './ElementItem'

import '../../static/styles/createInterior/elementList.css';

const ElementList = function ({showElements, scene, setcreateObject, elements}) {
	return(
		<div style={{display:showElements}} className="mainElements" >
			<h2>Elements</h2>
			<div className="elementList">
				{elements.map(element => 
					<ElementItem scene={scene} setcreateObject={setcreateObject} element={element} key={element.Id}/>
				)}
			</div>
		</div>
	)
}

export default ElementList