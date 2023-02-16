import React from 'react';
import {ErrorBoundary} from 'react-error-boundary'

import ElementItem from './ElementItem'
import ErrorItem from './ErrorItem'

import '../../static/styles/changeInterior/elementList.css';

const ElementList = function ({showElements, groupObjects, setcreateObject, elements}) {
	return(
		<div style={{display:showElements}} className="mainElements" >
			<h2>Elements</h2>
			<div className="elementList">
				{elements.map(element => 
					<ErrorBoundary key={element.Id} fallbackRender={props => <ErrorItem {...props} element={element} />}>
					    <ElementItem groupObjects={groupObjects} setcreateObject={setcreateObject} element={element} />
					</ErrorBoundary>
				)}
			</div>
		</div>
	)
}

export default ElementList