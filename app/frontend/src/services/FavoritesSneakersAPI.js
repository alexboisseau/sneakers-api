import axios from 'axios'


function add(sneaker, token){

    const newSneaker = {
        brand: sneaker.brand,
        name: sneaker.title,
        price: sneaker.retailPrice
    }

    return axios.post("http://localhost:5000/api/sneakers/add", newSneaker)
}

function findAll(id){
    return axios.get("http://localhost:5000/api/sneakers/user/" + id)
}

function remove(id){
    return axios.delete("http://localhost:5000/api/sneakers/"+id)
}

export default {
    add,
    findAll,
    remove
}

