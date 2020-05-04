import React from 'react';

const SneakerCard = ({brand, retailPrice, title, image="http://placeholdit/300x300", year}) => {
    return ( 
        <div className="col-2">
            <div className="card">
                <img className="card-img-top p-3" src={image} alt="sneaker" />
                <div className="card-body">
                    <p className="card-text">{brand}</p>
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">Année : {year}</p>
                    <p className="card-text">{retailPrice} &euro;</p>
                    <a href="www.google.com" className="btn btn-primary">Go somewhere</a>
                </div>
            </div>
        </div>
    );
}
 
export default SneakerCard;