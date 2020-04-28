import React from 'react';
import SneakerCard from './SneakerCard';
import SneakersAPI from '../services/SneakersAPI';
import { useState } from 'react';
import { useEffect } from 'react';

const SneakerList = (props) => {

    const [sneakers, setSneakers] = useState([]);

    const fetchSneakers = async () => {
        try{   
            const data = await SneakersAPI.fetchSneakers();
            setSneakers(data);
        } catch(error){

        }
    }
    
    useEffect(() => {
        fetchSneakers();
    },[])

    console.log(sneakers);

    return ( 
        <div className="mx-5">
            <div className="row">
                {sneakers.map(sneaker => <SneakerCard 
                    key={sneaker.id} 
                    title={sneaker.title} 
                    brand={sneaker.brand} 
                    image={sneaker.smallImageUrl} 
                    retailPrice={sneaker.retailPrice} 
                    year={sneaker.year}
                />)}
            </div>
        </div>
    );
}
 
export default SneakerList;