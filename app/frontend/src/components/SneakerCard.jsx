import React from 'react';
import ToSlug from '../services/ToSlug';

const SneakerCard = ({brand, retailPrice, title, image, year}) => {
    let slug = "https://stockx.com/" + ToSlug(title);
    return ( 
        <div className="col-2">
            <div className="card my-2">
                <img className="card-img-top p-3" src={image || "http://place-hold.it/150x100"} alt="Card image cap" />
                <div className="card-body">
                    <p className="card-text">{brand}</p>
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">Année : {year}</p>
                    <p className="card-text">{retailPrice} &euro;</p>
                    <a href={slug} target="_blank" className="btn btn-primary">Aller vers stockX</a>
                </div>
            </div>
        </div>
    );
}
 
export default SneakerCard;