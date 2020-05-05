import React, {useState, useEffect, useContext} from 'react'
import FavoritesSneakersAPI from '../services/FavoritesSneakersAPI'
import { AuthContext } from '../contexts/AuthContext'
import {toast} from 'react-toastify'
import Pagination from '../components/Pagination'
import Field from '../components/Field'
import toSlug from '../services/ToSlug'


const FavoritesSneakersPage = ({}) => {

    const [sneakers, setSneakers] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const auth = useContext(AuthContext)
    
    const itemsPerPage = 5
    

    // Permet d'aller récupérer la sélection des sneakers d'un utilisateur
    const fetchSneakers = async () => {
        try {
            const sneakers = await FavoritesSneakersAPI.findAll(auth.userId).then(response => response.data.sneakers)
            setSneakers(sneakers)
        } catch (error) {
            toast.error("Une erreur est survenue ❌")
        }
    }

    // Au chargement du composent on va chercher les sneakers
    useEffect(() => {fetchSneakers()}, []);

    // Gestion de la supression d'un élément
    const handleDelete = async id => {
        const originalSneakers = [...sneakers]
        setSneakers(sneakers.filter(sneaker => sneaker.id !== id))

        try{
            await FavoritesSneakersAPI.remove(id)
            toast.success("La paire de sneakers a bien été supprimée ✅")
        } catch (error) {
            setSneakers(originalSneakers)
            toast.error("Une erreur est survenue ❌")
        }
    }
    
    // Gestion du changement de page
    const handlePageChange = page => setCurrentPage(page)  

    // Gestion de la recherche
    const handleSearch = ({currentTarget}) => {
        setSearch(currentTarget.value)
        setCurrentPage(1)
    };

    // Filtrage des sneakers selon la recherche en comparant celle-ci au nom des sneakers
    const filteredSneakers = sneakers.filter(
        sneaker => sneaker.name.toLowerCase().includes(search.toLowerCase())          
    );

    // Pagination des données
    const paginatedSneakers = Pagination.getData(
        filteredSneakers,
        currentPage,
        itemsPerPage
    );



    return ( 
        <>
            <h2 className="text-center my-5 display-4">Ma selection de sneakers</h2>

            <Field 
                name="Rechercher" 
                label="Rechercher" 
                placeholder="Entrez le nom d'une paire" 
                onChange={handleSearch}
                value={search}
            />

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
                    {sneakers && paginatedSneakers.map( (sneaker,index) =>                   
                        <tr key={sneaker.id}>
                            <td>{index + 1}</td>
                            <td> 
                                <a href={`https://stockx.com/${toSlug(sneaker.name)}`} rel="noopener noreferrer" target="_blank">
                                    <span className="badge badge-primary">{sneaker.name}</span>
                                </a>
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

            {filteredSneakers.length > itemsPerPage && (
                <Pagination 
                    currentPage={currentPage} 
                    itemsPerPage={itemsPerPage} 
                    length={filteredSneakers.length} 
                    onPageChanged={handlePageChange} 
                />
            )}
            
        </>
    );
}
 
export default FavoritesSneakersPage;