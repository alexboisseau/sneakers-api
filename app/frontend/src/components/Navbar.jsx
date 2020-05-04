import React, { useContext } from 'react'

import { NavLink } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext'

const Navbar = (props) => {
	const auth = useContext(AuthContext)

	return (
		<nav className="navbar navbar-expand-lg navbar-dark bg-primary">
			<div className="container">
				<NavLink className="navbar-brand" to="/">
					Sneakers API
				</NavLink>

				<button
					className="navbar-toggler"
					type="button"
					data-toggle="collapse"
					data-target="#navbar"
					aria-controls="navbar"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span className="navbar-toggler-icon"></span>
				</button>

				<div className="collapse navbar-collapse" id="navbar">
					<ul className="navbar-nav mr-auto">
						<NavLink to="/nike" className="nav-NavLink">
							Nike
						</NavLink>
						<NavLink to="/adidas" className="nav-NavLink">
							Adidas
						</NavLink>
						<NavLink to="/jordan" className="nav-NavLink">
							Jordan
						</NavLink>
						<NavLink to="/puma" className="nav-NavLink">
							Puma
						</NavLink>
						<NavLink to="/saucony" className="nav-NavLink">
							Saucony
						</NavLink>
					</ul>

					<ul className="navbar-nav ml-auto">
						{(!auth.isLoggedIn && (
							<>
								<li className="nav-item">
									<NavLink to="/login" className="btn btn-light">
										Connexion
									</NavLink>
								</li>
								<li className="nav-item">
									<NavLink to="/register" className="ml-3 btn btn-light">
										Inscription
									</NavLink>
								</li>
							</>
						)) || (
							<>
								<li className="nav-item mx-2">
									<NavLink to="/account" className="btn btn-light">
										Mon compte
									</NavLink>
								</li>
								<li className="nav-item mx-2">
									<button onClick={auth.logout} className="btn btn-danger">
										Déconnexion
									</button>
								</li>
							</>
						)}
					</ul>
				</div>
			</div>
		</nav>
	)
}

export default Navbar
