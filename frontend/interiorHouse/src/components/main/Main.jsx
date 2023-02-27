import React, {useState, useEffect} from 'react';

import InteriorList from './InteriorList'

import '../../static/styles/main/Main.css';


const Main = function ({client}) {
	const [interiors,setInteriors] = useState([])
    
    useEffect(() => {
        fetchInteriorStart()
        // eslint-disable-next-line
    }, [])

    async function fetchInteriorStart() {
        const response = await client.get("/InteriorsStart")
        setInteriors(response.data)
    }

	return(
        <div className="main">
            <div className="main-info">
                <h2>Lorem ipsum, dolor sit, amet consectetur adipisicing elit. Voluptatem qui atque, dolore est quod rem placeat</h2>
                <h3>Lorem ipsum, dolor sit, amet consectetur adipisicing elit. Voluptatem qui atque, dolore est quod rem placeat architecto vitae autem cupiditate itaque aperiam consequatur nemo recusandae commodi nisi maxime. Nemo, aut!Lorem ipsum, dolor sit, amet consectetur adipisicing elit. Voluptatem qui atque, dolore est quod rem placeat architecto vitae autem cupiditate itaque aperiam consequatur nemo recusandae commodi nisi maxime. Nemo, aut!Lorem ipsum, dolor sit, amet consectetur adipisicing elit. Voluptatem qui atque, dolore est quod rem placeat architecto vitae autem cupiditate itaque aperiam consequatur nemo recusandae commodi nisi maxime. Nemo, aut!</h3>
                <h1> Lorem ipsum, dolor sit, amet consectetur adipisicing elit.</h1>
            </div>
            <h1 className="">Start with interior</h1>
            <InteriorList client={client} interiors={interiors} />
        </div>
	)
}

export default Main;