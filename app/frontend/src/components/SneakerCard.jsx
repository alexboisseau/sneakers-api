import React from 'react'
import FavoritesSneakersAPI from '../services/FavoritesSneakersAPI'
import toSlug from '../services/ToSlug'
import {toast} from 'react-toastify'

const SneakerCard = ({brand, retailPrice, title, image="http://placeholdit/300x300", year, sneaker}) => {
    
    const stockXUrl = toSlug(title)

    const handleClick = async () => {
        try{
            await FavoritesSneakersAPI.add(sneaker)
            toast.success("La paire a été ajoutée à votre sélection ✅")
        } catch(error){
            toast.error("Une erreur est survenue ❌")
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
                    <a href={`https://stockx.com/${stockXUrl}`} rel="noopener noreferrer" target="_blank" className="btn btn-primary mb-2">Vers StockX</a>
                    <button onClick={handleClick} type="button" className="btn btn-primary">Ajouter à ma sélection</button>
                </div>
            </div>
        </div>
    );
}
 
export default SneakerCard;