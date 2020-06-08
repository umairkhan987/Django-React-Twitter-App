import axios from "axios";

axios.interceptors.response.use(null, error => {
    const expectedError = error.response && error.response.status >= 400 && error.response.status <= 500;

    if (!expectedError) {
        alert("An unexpected error occured");
        console.log("Unexpected Error ", error);
    }
    return Promise.reject(error);
});


function setJwt(jwt) {
    if (jwt !== null)
        axios.defaults.headers.common['Authorization'] = `Bearer ` + jwt;
}

export default {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete,
    setJwt,
}