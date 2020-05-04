import React from 'react';
import { LOGIN_API } from './config';

function logout() {
    window.localStorage.removeItem("authToken");
    delete axios.defaults.headers["Authorization"];
}

function setAxiosToken(token){
    axios.defaults.headers["Authorization"] = "Bearer " + token;
}

function authenticate (credentials) {

    return axios
        .post(LOGIN_API, credentials)
        .then(response => response.data.token)
        .then(token => {
            //Stockage du token dans le localStorage
            window.localStorage.setItem('authToken', token);
        
            //On prévient Axios qu'on a maintent un token a rajouter dans le header de nos futures requêtes
            setAxiosToken(token);
        })
}