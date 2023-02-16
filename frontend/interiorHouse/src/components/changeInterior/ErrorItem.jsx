import React from 'react';

const ErrorItem = function ({error,element}) {
	
	function reloadObject(e){
		console.log(e)
	}

	return(
		<div onClick={reloadObject} className="elementItem">
			<img style={{height: `10em`, width: `95%` }} src={require("../../static/images/errorLoad.png")} alt="error load" />
            <h3>{element.Name}</h3>
            <p>Type: {element.Type}</p>
        </div>
	)
}

export default ErrorItem