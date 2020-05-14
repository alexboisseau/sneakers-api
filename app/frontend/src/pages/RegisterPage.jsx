import React, { useState, useContext } from 'react'
import Field from '../components/Field'
import { AuthContext } from '../contexts/AuthContext'
import UsersAPI from '../services/UsersAPI'
import { toast } from 'react-toastify'

const RegisterPage = ({ history }) => {
	const [credentials, setCredentials] = useState({
		name: '',
		email: '',
		password: ''
	})
	const [errorLogin, setErrorLogin] = useState('d-none')
	const auth = useContext(AuthContext)

	// Gestion des champs
	const handleChange = ({ currentTarget }) => {
		const { value, name } = currentTarget
		setCredentials({ ...credentials, [name]: value })
	}

	// Gestion du submit
	const handleSubmit = async (event) => {
		event.preventDefault()

		try {
			const responseData = await UsersAPI.create(credentials)
			setErrorLogin('d-none')
			auth.login(responseData.data.userId, responseData.data.token)
			toast.success(
				'Votre compte a bien été crée. Vous êtes maintenant connecté ✅'
			)
			history.replace('/')
		} catch (error) {
			setErrorLogin('')
			toast.success('Une erreur est survenue ❌')
		}
	}

	return (
		<div className="container my-5">
			<h1 className="text-center my-5">Inscription</h1>
			<p className={`my-3 text-danger ${errorLogin}`}>
				Les informations sont invalides !
			</p>
			<form onSubmit={handleSubmit}>
				<Field
					name="name"
					label="Nom"
					value={credentials.name}
					onChange={handleChange}
					placeholder="Nom"
					type="text"
				/>

				<Field
					name="email"
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
						Inscription
					</button>
				</div>
			</form>
		</div>
	)
}

export default RegisterPage
