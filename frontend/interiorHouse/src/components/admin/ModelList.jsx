import React from 'react';
import { Link } from 'react-router-dom';

import '../../static/styles/admin/modelList.css';

const ModelList = function ({models}) {
	return(
		<div className="ModelList">
	        {models.map(model => 
	    		<Link className="LinkModelItem" to={"/admin/models/"+model} key={model}>{model}</Link>
			)}
		</div>
	)
}


export default ModelList;