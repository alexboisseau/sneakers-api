import React from 'react';
import SneakerCard from './SneakerCard';
import SneakersAPI from '../services/SneakersAPI';
import { useState } from 'react';
import { useEffect } from 'react';
import Field from './Field';

const SneakerList = ({brand}) => {

    const [sneakers, setSneakers] = useState([]);

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
  }

    // Filtrage des customers selon la recherche
    const filteredSneakers = sneakers.filter(
        sneaker => sneaker.title.toLowerCase().includes(search.toLowerCase())
        
             
    )
    
    useEffect(() => {
        fetchSneakers();
    },[brand])

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
                    {filteredSneakers.map(sneaker => <SneakerCard 
                        key={sneaker.id} 
                        title={sneaker.title} 
                        brand={sneaker.brand} 
                        image={sneaker.media.smallImageUrl} 
                        retailPrice={sneaker.retailPrice} 
                        year={sneaker.year}
                    />)}
                </div>
            </div>
        </>
    );
}
 
export default SneakerList;