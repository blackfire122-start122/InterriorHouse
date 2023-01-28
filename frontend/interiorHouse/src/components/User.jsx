import React, {useState, useEffect} from 'react';

const User = function ({client}) {
    const [interiors,setInteriors] = useState([])

    useEffect(() => {
        fetchInteriors()
        // eslint-disable-next-line
    }, [])

    async function fetchInteriors() {
        const response = await client.get("/user/interiors")
        setInteriors(response.data)
    }

	return(
	<div className="login-wrapper">
		<h1>User</h1>
		
		{/*ToDo: need components*/}
		{interiors.map(interior => 
			<div>
				<h1>interior.File</h1>
			</div>
		)}
	</div>
	)
}

export default User;