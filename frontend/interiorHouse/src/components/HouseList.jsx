import React from 'react';
import HouseItem from './HouseItem'
import '../static/styles/HouseList.css';

const HouseList = function ({houses}) {
	return(
		<div className="houseList">
			{houses.map(house => 
				<HouseItem house={house} key={house.Id}/>
			)}
		</div>
	)
}

export default HouseList;