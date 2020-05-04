import React, {useContext} from 'react';
import FavoritesSneakers from '../services/FavoritesSneakersAPI';
import {AuthContext} from '../contexts/AuthContext'

const SneakerCard = ({brand, retailPrice, title, image="http://placeholdit/300x300", year, sneaker}) => {
    
    const handleClick = async () => {
        try{
            const data = await FavoritesSneakers.add(sneaker)
        } catch(error){
            console.log(error.response)
            
        }
    }

    return ( 
        <div className="col-2">
            <div className="card">
                <img className="card-img-top p-3" src={image} alt="sneaker" />
                <div className="card-body">
                    <p className="card-text">{brand}</p>
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">Année : {year}</p>
                    <p className="card-text">{retailPrice} &euro;</p>
                    <a href="www.google.com" className="btn btn-primary">Vers StockX</a>
                    <button onClick={handleClick} type="button" className="btn btn-primary">Ajouter à ma sélection</button>
                </div>
            </div>
        </div>
    );
}
 
export default SneakerCard;