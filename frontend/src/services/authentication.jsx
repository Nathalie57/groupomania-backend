import axios from 'axios'
import jwtDecode from 'jwt-decode';

function logout() {
    window.localStorage.removeItem("authToken");
    delete axios.defaults.headers["Authorization"];
}

function authenticate(credentials) {
    return axios
        .post("http://localhost:3000/api/users/login", credentials)
        .then(response => response.data.token)
        .then(token => {
            window.localStorage.setItem("authToken", token);
            axios.defaults.headers["authorization"] = "Bearer " + token;
            return true;
        })
}

function isAuthenticated() {
    const token = localStorage.getItem('authToken');
    if (token != null) {
        return true;
    }
    return false;
}

function decode() {
    const token = localStorage.getItem('authToken');

    if (token) {
        const jwtData = jwtDecode(token);
        console.log(jwtData);
    } 
}

export default {
    authenticate,
    logout,
    isAuthenticated,
    decode
};