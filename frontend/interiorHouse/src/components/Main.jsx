import React, {useState, useEffect} from 'react';

import HouseList from './HouseList'

import '../styles/Main.css'

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
        <div className="main">
            <div className="main-info">
                <h2>Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere quam</h2>
                <h3>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam neque, est architecto animi quo numquam consequuntur porro! Dolorum dolorem sint tempore provident rerum eos, voluptatum placeat quis ab magnam mollitia.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam neque, est architecto animi quo numquam consequuntur porro! Dolorum dolorem sint tempore provident rerum eos, voluptatum placeat quis ab magnam mollitia.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam neque, est architecto animi quo numquam consequuntur porro! Dolorum dolorem sint tempore provident rerum eos, voluptatum placeat quis ab magnam mollitia.
                </h3>
                <h1>Lorem ipsum dolor sit amet consectetur adipisicing</h1>
            </div>
            
            <h2>Start with House</h2>
            <HouseList houses={houses} />
        </div>
    )
}

export default Main;