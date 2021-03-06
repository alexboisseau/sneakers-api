import axios from 'axios'

function fetchUser(id){
    return axios.get("http://localhost:5000/api/users/" + id)
}

function update(id, user){
    return axios.patch("http://localhost:5000/api/users/" + id, user)
}

function create(user){
    return axios.post("http://localhost:5000/api/users/signup", user)
}

export default {
    fetchUser,
    update,
    create
}