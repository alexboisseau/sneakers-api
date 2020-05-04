import React, { useContext } from 'react'
import { Link } from 'react-router-dom'

import { AuthContext } from '../contexts/AuthContext'

const Navbar = (props) => {
	const auth = useContext(AuthContext)

	return (
		<nav className="navbar navbar-expand-lg navbar-dark bg-primary">
			<div className="container">
				<Link className="navbar-brand" to="/">
					Sneakers API
				</Link>

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
						<Link to="/nike" className="nav-link">
							Nike
						</Link>
						<Link to="/adidas" className="nav-link">
							Adidas
						</Link>
						<Link to="/jordan" className="nav-link">
							Jordan
						</Link>
						<Link to="/puma" className="nav-link">
							Puma
						</Link>
						<Link to="/saucony" className="nav-link">
							Saucony
						</Link>
						{!auth.isLoggedIn && (
							<Link to="/login" className="nav-link">
								Connexion
							</Link>
						)}
						{auth.isLoggedIn && (
							<Link to="/logout" className="nav-link">
								Déconnexion
							</Link>
						)}
					</ul>
				</div>
			</div>
		</nav>
	)
}

export default Navbar
