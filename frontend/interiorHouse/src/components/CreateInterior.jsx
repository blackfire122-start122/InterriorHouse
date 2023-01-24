import React, {useState, useEffect} from 'react';

import ElementList from './createInteriorComponents/ElementList'

import './../styles/createInterior/createInterior.css';

const CreateInterior = function ({client}) {
    const [elements,setElements] = useState([])

    async function fetchElements() {
        const response = await client.get("/elements")
        setElements(response.data)
    }

    useEffect(() => {
        fetchElements()
    }, [])

	return(
		<div className="createInterior">
            <h1>create</h1>
            <ElementList elements={elements} />
        </div>
	)
}

export default CreateInterior;