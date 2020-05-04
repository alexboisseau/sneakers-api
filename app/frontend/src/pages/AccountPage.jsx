import React, {useContext, useState} from 'react';
import {AuthContext} from '../contexts/AuthContext';
import Field from '../components/Field';
import UsersAPI from '../services/UsersAPI';
import { useEffect } from 'react';

const AccountPage = () => {
    
    const [user, setUser] = useState({
		name: '',
		email: ''
    })
    
    const auth = useContext(AuthContext)

    useEffect(() => {
        fetchUser()
    }, [])
    
    // Permet d'aller récupérer l'utilisateur connecté
    const fetchUser = async () => {
        try {
            const data = await UsersAPI.fetchUser(auth.userId).then(response => response.data.user);
            setUser({
                name: data.name,
                email: data.email
            })
        } catch (error) {
            console.log("error")
        }
    }

    // Gestion des champs
	const handleChange = ({ currentTarget }) => {
		const { value, name } = currentTarget

		setUser({ ...user, [name]: value })
    }
    
    const handleSubmit = async (event) => {
        event.preventDefault();

        try{
            const data = await UsersAPI.update(auth.userId, user)
            console.log(data)
            //TODO
        } catch(error){
            console.log(error)
            // TODO 
        }
    }

    return ( 
        <>
            <form onSubmit={handleSubmit} className="container">
                <h2 className="text-center my-5 display-4">Changer les paramètres de mon compte 🛠</h2>
                <Field
                    name="name"
                    label="Nom & Prénom"
                    value={user.name}
                    onChange={handleChange}
                    placeholder="Adresse email de connexion"
                />
                <Field
                    name="email"
                    label="Adresse Email"
                    value={user.email}
                    onChange={handleChange}
                    placeholder="Adresse email de connexion"
                    type="email"
                />

                <div className="form-group">
                    <button type="submit" className="btn btn-primary">
                        Enregistrer
                    </button>
                </div>
            </form>
        </>
    );
}
 
export default AccountPage;