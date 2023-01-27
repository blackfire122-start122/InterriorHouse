import React, {useState, useEffect} from 'react';

import HouseList from './HouseList'

const Main = function ({client}) {
	const [houses,setHouses] = useState([])
    
    useEffect(() => {
        fetchHouse()
        // eslint-disable-next-line
    }, [])

    async function fetchHouse() {
        const response = await client.get("/houses")
        setHouses(response.data)
    }

	return(
		<HouseList houses={houses} />
	)
}

export default Main;