import React, {useState, useEffect, useContext} from 'react';
import FavoritesSneakersAPI from '../services/FavoritesSneakersAPI';
import { Link } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext';


const FavoritesSneakersPage = ({}) => {

    const [sneakers, setSneakers] = useState([])
    const auth = useContext(AuthContext)
    

    // Permet d'aller récupérer les sneakers
    const fetchSneakers = async () => {
        try {
            console.log("try")
            const sneakers = await FavoritesSneakersAPI.findAll(auth.userId).then(response => response.data.sneakers);
            console.log(sneakers)
            setSneakers(sneakers);
        } catch (error) {
            console.log("error")
        }
    }

    const handleDelete = async id => {
        const originalSneakers = [...sneakers];
        setSneakers(sneakers.filter(sneaker => sneaker.id !== id));

        try{
            await FavoritesSneakersAPI.remove(id);
        } catch (error) {
            setSneakers(originalSneakers);
        }
    }

    // Au chargement du composent on va chercher les sneakers
    useEffect(() => {fetchSneakers()}, []);



    return ( 
        <>
            <h2 className="text-center my-5 display-4">Ma selection de sneakers</h2>

            <table className="table table-hover mt-5 container">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nom</th>
                        <th>Marque</th>
                        <th>Prix</th>
                        <th >Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {sneakers && sneakers.map( (sneaker,index) =>                   
                        <tr key={sneaker.id}>
                            <td>{index + 1}</td>
                            <td> 
                                <span className="badge badge-primary">{sneaker.name}</span>
                            </td>
                            <td>{sneaker.brand}</td>
                            <td>{sneaker.price} &euro;</td>
                            <td>
                                <button 
                                    className="btn btn-sm btn-danger"
                                    onClick={() => handleDelete(sneaker.id)}
                                >
                                    Supprimer
                                </button>
                            </td>
                        </tr>
                    )}

                </tbody>
            </table>
            
        </>
    );
}
 
export default FavoritesSneakersPage;