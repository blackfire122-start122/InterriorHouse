import React, {useState, useEffect} from 'react';
import InteriorList from './InteriorList'
import CreateInteriorForm from './CreateInteriorForm'

const User = function ({client}) {
	const [interiors,setInteriors] = useState([])
	const [username,setUsername] = useState([])
	const [email,setEmail] = useState([])
	const [createInteriorShow,setCreateInteriorShow] = useState(false)
	const [BtnCreateInteriorShow,setBtnCreateInteriorShow] = useState(true)

	useEffect(() => {
		fetchInteriors()
		fetchUser()
		// eslint-disable-next-line
	}, [])

	async function fetchInteriors() {
		const response = await client.get("/user/interiors")
		setInteriors(response.data)
	}

	async function fetchUser() {
		const response = await client.get("/user/getUser")
		setUsername(response.data["Username"])
		setEmail(response.data["Email"])
	}

	async function createInteriorOnClick(e){
		setCreateInteriorShow(true)
		setBtnCreateInteriorShow(false)
	}

	return(
		<div className="user">
			<h1>{username}</h1>
			<p>{email}</p>
			<br></br>
			<InteriorList interiors={interiors} />
	
			{BtnCreateInteriorShow?<button onClick={createInteriorOnClick}>Create Interior</button>:null}
			{createInteriorShow?<CreateInteriorForm client={client} setCreateInteriorShow={setCreateInteriorShow} setBtnCreateInteriorShow={setBtnCreateInteriorShow} />:null}
		</div>
	)
}

export default User;