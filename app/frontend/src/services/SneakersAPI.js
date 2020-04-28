import axios from 'axios';

function fetchSneakers(){
    return axios
        .get("http://localhost:5000/api/sneakers")
        .then(response => response.data.sneakers)
        
}

function fetchSneakersByBrand(brand){
    return axios
        .get("http://localhost:5000/api/sneakers/" + brand)
        .then(response => response.data.sneakers)
        
}

export default {
    fetchSneakers,
    fetchSneakersByBrand
}