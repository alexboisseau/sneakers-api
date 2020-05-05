import React, { useState, useEffect } from 'react'
import SneakerCard from './SneakerCard'
import SneakersAPI from '../services/SneakersAPI'
import Field from './Field'
import Pagination from '../components/Pagination'
import {toast} from 'react-toastify'

const SneakerList = ({brand}) => {

    const [sneakers, setSneakers] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [search, setSearch] = useState("")
    
    const itemsPerPage = 10

    // Fonction permettant de récupérer la liste des chaussures en faisant appel à une des deux fonctions ci-dessous
    // dans le service `SneakersAPI`.
    const fetchSneakers = async () => {
        try{   
            if(brand){
                const data = await SneakersAPI.fetchSneakersByBrand(brand)
                setSneakers(data)
            } else {
                const data = await SneakersAPI.fetchSneakers()
                setSneakers(data)
            }
        } catch(error){
            toast.success("Une erreur est survenue ❌")
        }
    };

    // On se "branche" sur la variable brand, si celle-ci change, on rappelle la fonction fetchSneakers pour recharger les bonnes données
    useEffect(() => { 
        fetchSneakers() 
    }, [brand])

  
    // Fonction qui met à jour la valeur dans la barre de recherche pour filtrer ensuite les données
    const handleSearch = ({currentTarget}) => {
    setSearch(currentTarget.value)
    setCurrentPage(1)
    };

    // Filtrage des sneakers selon la recherche en comparant celle-ci au nom des sneakers
    const filteredSneakers = sneakers.filter(
        sneaker => sneaker.title.toLowerCase().includes(search.toLowerCase())          
    );
    
    // Gestion du changement de page
    const handlePageChange = page => setCurrentPage(page)

    // Pagination des données
    const paginatedSneakers = Pagination.getData(
        filteredSneakers,
        currentPage,
        itemsPerPage
    );

    return ( 
        <>
            <Field 
                name="Rechercher" 
                label="Rechercher" 
                placeholder="Veuillez entrer une marque de sneaker" 
                onChange={handleSearch}
                value={search}
            />

            <div className="mx-5">
                <div className="row">
                    {paginatedSneakers.map(sneaker => 
                        <SneakerCard 
                            key={sneaker.id} 
                            title={sneaker.title} 
                            brand={sneaker.brand} 
                            image={sneaker.media.smallImageUrl} 
                            retailPrice={sneaker.retailPrice} 
                            year={sneaker.year}
                            sneaker={sneaker}
                        />
                    )}
                </div>
            </div>  
               
            <Pagination
                currentPage={currentPage} 
                itemsPerPage={itemsPerPage} 
                onPageChanged={handlePageChange} 
                length={filteredSneakers.length} 
            />
        </>
    );
}
 
export default SneakerList;