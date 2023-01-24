import React from 'react';

const ElementItem = function ({element}) {
	return(
		<div className="elementItem">
			<img src={element.Img} alt={element.Name + " image"} />
            <h3>{element.Name}</h3>
            <p>Type: {element.Type}</p>
        </div>
	)
}

export default ElementItem;