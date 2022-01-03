import { END_POINT } from '../helpers/constant'

//RESPONSE PARSE
function parseResponse(response) {

    return response.json().then((json) => {
        //if unsuccessfull api call happens we(promise) will reject request and catch the error message in catch block 
        if (!response.ok) {
            return Promise.reject(json);
        }
        //when successfull api call happens will return whole payload in json format
        return json;
    });
}

const API = {

    //GET METHOD
    async get(url) {
        return fetch(`${END_POINT}${url}`, {
            method: 'GET',
            headers: new Headers({ "Content-Type": "application/json" }),
        })
            .then(parseResponse)
    },

    //POST METHOD
    async post(url, data) {
        const body = JSON.stringify(data)
        return fetch(`${END_POINT}${url}`, {
            method: 'POST',
            headers: new Headers({ "Content-Type": "application/json" }),
            body,
        })
            .then(parseResponse)
    },

    //PUT METHOD
    async put(url, data) {
        const body = JSON.stringify(data)
        return fetch(`${END_POINT}${url}`, {
            method: 'PUT',
            headers: new Headers({ "Content-Type": "application/json" }),
            body,
        })
            .then(parseResponse)
    }

}

export default API;