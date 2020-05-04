import axios from 'axios'

function login(credentials) {
    return axios.post("http://localhost:5000/api/users/login", credentials)
}

export default {
    login
}