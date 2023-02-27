import React, {useState} from 'react';

import '../../static/styles/auth/login.css';

const Login = function ({client}) {
	const [username, setUserName] = useState()
	const [password, setPassword] = useState()
	const [error, setError] = useState("")

	async function loginUser() {
		await client.post('/user/login', JSON.stringify({
			username: username,
			password: password
		}))
		.then(function (response) {
			console.log(response.data)
		})
		.catch(function (error) {
			setError(error.response.data["Login"])
		})
	}


	const handleSubmit = async e => {
		e.preventDefault()
		await loginUser()
	}

	return(
	<div className="login-wrapper">
		<h1>Please Log In</h1>
			<form onSubmit={handleSubmit}>
				<label>
					<p>Username</p>
					<input type="text" onChange={e => setUserName(e.target.value)} />
				</label>
				<label>
					<p>Password</p>
					<input type="password" onChange={e => setPassword(e.target.value)} />
				</label>
				<div>
					<button type="submit">Submit</button>
				</div>
				<span>{error}</span>
			</form>
	</div>
	)
}

export default Login;