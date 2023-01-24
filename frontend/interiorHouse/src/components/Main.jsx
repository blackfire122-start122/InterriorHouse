import React, {useState, useEffect} from 'react';

import HouseList from './HouseList'

const Main = function ({client}) {
	const [houses,setHouses] = useState([])

    async function fetchHouse() {
        const response = await client.get("/houses")
        setHouses(response.data)
    }

    useEffect(() => {
        fetchHouse()
    }, [])

	return(
		<HouseList houses={houses} />
	)
}

export default Main;