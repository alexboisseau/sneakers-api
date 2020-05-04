import React, { useState, useContext } from 'react'
import Field from '../components/Field'

const LoginPage = () => {
	const [credentials, setCredentials] = useState({
		username: '',
		password: ''
	})
	const [errorLogin, setErrorLogin] = useState('d-none')

	// Gestion des champs
	const handleChange = ({ currentTarget }) => {
		const { value, name } = currentTarget

		setCredentials({ ...credentials, [name]: value })
	}

	// Gestion du submit
	const handleSubmit = async (event) => {
		event.preventDefault()
	}

	return (
		<>
			<div className="container my-5">
				<h1 className="text-center my-5">Connexion à l'application</h1>

				<p className={`my-3 text-danger ${errorLogin}`}>
					Les informations de connexion sont invalides !
				</p>
				<form onSubmit={handleSubmit}>
					<Field
						name="username"
						label="Adresse Email"
						value={credentials.username}
						onChange={handleChange}
						placeholder="Adresse email de connexion"
						type="email"
					/>

					<Field
						name="password"
						label="Mot de passe"
						value={credentials.password}
						onChange={handleChange}
						type="password"
					/>

					<div className="form-group">
						<button type="submit" className="btn btn-primary">
							Connexion
						</button>
					</div>
				</form>
			</div>
		</>
	)
}

export default LoginPage
