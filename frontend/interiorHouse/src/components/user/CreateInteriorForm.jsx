import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';

import "./../../static/styles/user/CreateInteriorForm.css";

const CreateInteriorForm = function ({client, setCreateInteriorShow, setBtnCreateInteriorShow}) {
    const [error, setError] = useState("")
    const navigate = useNavigate()

    async function handleSubmit(e){
        e.preventDefault()
        await client.post("/user/createInterior",JSON.stringify({
            "name":e.target.name.value
        }))
        .then(function (response) {
            navigate("/ChangeInterior", {replace:true,state: {new:true,interior:{Name: e.target.name.value, Id:response.data["Id"]}}})
        })
        .catch(function (error) {
            console.log(error)
            setError(error.response.data["Create"])
        })
    }

    function close(){
        setBtnCreateInteriorShow(true)
        setCreateInteriorShow(false)
    }

	return(
        <form className="CreateInteriorForm" onSubmit={handleSubmit}>
            <label>
                <p>Name</p>
                <input name="name" type="text" />
            </label>
            <button type="submit">Create</button>
            <button onClick={close} type="button">Close</button>

            <span>{error}</span>
        </form>
	)
}

export default CreateInteriorForm;