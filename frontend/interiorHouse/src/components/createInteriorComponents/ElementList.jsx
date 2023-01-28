import React from 'react';

import ElementItem from './ElementItem'

import '../../static/styles/createInterior/elementList.css';

const ElementList = function ({elements}) {
	return(
		<div className="mainElements">
			<h2>Elements</h2>
			<div className="elementList">
				

		<div className="elementItem">
			<img src={require("./../../static/images/main-info.jpg")} />
            <h3>element.Name</h3>
            <p>Type: type</p>
        </div>
		<div className="elementItem">
			<img src={require("./../../static/images/main-info.jpg")} />
            <h3>element.Name</h3>
            <p>Type: type</p>
        </div>
		<div className="elementItem">
			<img src={require("./../../static/images/main-info.jpg")} />
            <h3>element.Name</h3>
            <p>Type: type</p>
        </div>

				{elements.map(element => 
					<ElementItem element={element} key={element.Id}/>
				)}
			</div>
		</div>
	)
}

export default ElementList