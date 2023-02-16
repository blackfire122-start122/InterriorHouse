import React, {useEffect, useState} from 'react';
import { Routes, Route } from 'react-router-dom';

import '../../static/styles/admin/models.css';
import ModelItem from './ModelItem'
import ModelList from './ModelList'
import ChangeRecord from './ChangeRecord'

const Models = function ({client}) {
	const [models, setModels] = useState([])
	useEffect(() => {
		fetchModels()
		// eslint-disable-next-line
	}, [])


	async function fetchModels() {
		const response = await client.get("/admin/models")
		if (response.data){
			setModels(response.data)
		}
	}

	return(
		<div className="Models">
			<Routes>
            	<Route path={'/'} element={<ModelList models={models}/>}></ Route>
            	<Route path={'/changeRecord'} element={<ChangeRecord/>}></ Route>
				{models.map(model => 
            		<Route path={'/'+model} element={<ModelItem client={client} model={model} />} key={model}></ Route>
				)}
            </ Routes>
        </div>
	)
}


export default Models;