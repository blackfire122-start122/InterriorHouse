import React from 'react';
import HouseItem from './HouseItem'

const HouseList = function ({houses}) {
	return(
		<div>
			{houses.map(house => 
				<HouseItem house={house} key={house.Id}/>
			)}
		</div>
	)
}

export default HouseList;