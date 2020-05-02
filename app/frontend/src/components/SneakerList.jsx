import React from 'react';
import SneakerCard from './SneakerCard';
import SneakersAPI from '../services/SneakersAPI';
import { useState } from 'react';
import { useEffect } from 'react';
import Field from './Field';
import Pagination from '../components/Pagination';

const SneakerList = ({brand}) => {

    const [sneakers, setSneakers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const fetchSneakers = async () => {
        try{   
            if(brand){
                const data = await SneakersAPI.fetchSneakersByBrand(brand);
                setSneakers(data);
            } else {
                const data = await SneakersAPI.fetchSneakers();
                setSneakers(data);
            }
        } catch(error){

        }
    }

  const [search, setSearch] = useState("");

  const handleSearch = ({currentTarget}) => {
    setSearch(currentTarget.value);
    setCurrentPage(1);
  }

    // Filtrage des customers selon la recherche
    const filteredSneakers = sneakers.filter(
        sneaker => sneaker.title.toLowerCase().includes(search.toLowerCase())
        
             
    )
    
    useEffect(() => {
        fetchSneakers();
    },[brand])

    // Gestion du changement de page
    const handlePageChange = page => setCurrentPage(page);

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
                    {paginatedSneakers.map(sneaker => <SneakerCard 
                        key={sneaker.id} 
                        title={sneaker.title} 
                        brand={sneaker.brand} 
                        image={sneaker.media.smallImageUrl} 
                        retailPrice={sneaker.retailPrice} 
                        year={sneaker.year}
                    />)}
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