import React, {useState, useEffect} from 'react';

import HouseList from './HouseList'

import '../static/styles/Main.css';


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
                <h2>Lorem ipsum, dolor sit, amet consectetur adipisicing elit. Voluptatem qui atque, dolore est quod rem placeat</h2>
                <h3>Lorem ipsum, dolor sit, amet consectetur adipisicing elit. Voluptatem qui atque, dolore est quod rem placeat architecto vitae autem cupiditate itaque aperiam consequatur nemo recusandae commodi nisi maxime. Nemo, aut!Lorem ipsum, dolor sit, amet consectetur adipisicing elit. Voluptatem qui atque, dolore est quod rem placeat architecto vitae autem cupiditate itaque aperiam consequatur nemo recusandae commodi nisi maxime. Nemo, aut!Lorem ipsum, dolor sit, amet consectetur adipisicing elit. Voluptatem qui atque, dolore est quod rem placeat architecto vitae autem cupiditate itaque aperiam consequatur nemo recusandae commodi nisi maxime. Nemo, aut!</h3>
                <h1> Lorem ipsum, dolor sit, amet consectetur adipisicing elit.</h1>
            </div>
            <h1 className="">Start with house</h1>
            <HouseList houses={houses} />
        </div>
	)
}

export default Main;