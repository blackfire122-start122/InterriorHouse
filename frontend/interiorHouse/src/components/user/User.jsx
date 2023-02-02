import React, {useState, useEffect} from 'react';
import InteriorList from './InteriorList'

const User = function ({client}) {
    const [interiors,setInteriors] = useState([])
    const [username,setUsername] = useState([])
    const [email,setEmail] = useState([])

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

	return(
	<div className="user">
		<h1>{username}</h1>
		<p>{email}</p>
		<InteriorList interiors={interiors} />
	</div>
	)
}

export default User;