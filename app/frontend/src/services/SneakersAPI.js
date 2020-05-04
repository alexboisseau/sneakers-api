import axios from 'axios';

// Fonction faisant appel au back qui lui va faire un appel à la véritable API pour récupérer les 50 dernières sneakers
function fetchSneakers(){
    return axios
        .get("http://localhost:5000/api/sneakers")
        .then(response => response.data.sneakers) 
}

// Fonction faisant appel au back qui lui va faire un appel à la véritable API en lui passant en paramètre une marque pour récupérer
// les dernières 50 dernières chaussures de la marque en question
function fetchSneakersByBrand(brand){
    return axios
        .get("http://localhost:5000/api/sneakers/" + brand)
        .then(response => response.data.sneakers)
}

export default {
    fetchSneakers,
    fetchSneakersByBrand
}