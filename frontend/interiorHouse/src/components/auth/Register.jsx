import React, {useState} from 'react';

const Register = function ({client,setShowRegister}) {
	const [username, setUserName] = useState()
	const [password1, setPassword1] = useState()
	const [password2, setPassword2] = useState()
	const [email, setEmail] = useState()
	const [error, setError] = useState("")

	async function registerUser() {
		await client.post('/user/register', JSON.stringify({
			username: username,
			password1: password1,
			password2: password2,
			email:email,
		}))
		.then(function (response) {
			console.log(response)
			setShowRegister(false)
		})
		.catch(function (error) {
			console.log(error)
			setError(error.response.data["Login"])
		})
	}


	const handleSubmit = async e => {
		e.preventDefault()
		await registerUser()
	}

	return(
	<div className="login-wrapper">
		<h1>Please Register</h1>
			<form onSubmit={handleSubmit}>
				<label>
					<p>Username</p>
					<input type="text" onChange={e => setUserName(e.target.value)} />
				</label>
				<label>
					<p>Password</p>
					<input type="password" onChange={e => setPassword1(e.target.value)} />
				</label>
				<label>
					<p>Password</p>
					<input type="password" onChange={e => setPassword2(e.target.value)} />
				</label>
				<label>
					<p>Email</p>
					<input type="email" onChange={e => setEmail(e.target.value)} />
				</label>
				<div>
					<button type="submit">Submit</button>
				</div>
				<span>{error}</span>
			</form>
	</div>
	)
}

export default Register;