import React from 'react'
import '../../static/styles/main/InteriorItem.css'
import { useNavigate } from 'react-router-dom';


const InteriorItem = function ({client,interior}) {
    const navigate = useNavigate()

	async function createInteriorUserFromStartInterior(e){
        e.preventDefault()
        await client.post("/user/createInterior",JSON.stringify({
            "name":interior.Name
        }))
        .then(function (response) {
            navigate("/ChangeInterior", {replace:true,state: {new:false, newId:response.data["Id"], interior:interior }})
        })
    }


	return(
		<div className="interior" onClick={createInteriorUserFromStartInterior}>
			{/* full url for nginx*/}
			<img className="imgInterior" src={"http://localhost/"+interior.Image} alt={interior.Name+" image"}/>
			<h1 className="interiorName">{interior.Name}</h1>					
		</div>
	)
}

export default InteriorItem;
