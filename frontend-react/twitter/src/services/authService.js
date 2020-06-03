import http from "./httpService";
import JwtDecode from "jwt-decode";

const endPoint = "http://127.0.0.1:8000/api/auth/token";


export async function setJwt() {
    const { data } = await http.post(endPoint, { username: "adil", password: "khan1234" });
    localStorage.setItem("token", data.access);
    return data.access;
}

async function refreshToken() {
    localStorage.removeItem("token");
    return await setJwt();
}


export async function getCurrentUser() {
    try {
        let token = localStorage.getItem("token");

        if (!token) {
            console.log("No token found");
            return null;
        }

        let decodedToken = JwtDecode(token);
        if (Date.now() >= decodedToken.exp * 1000) {
            console.log("Token is expired");
            token = await refreshToken();
            console.log("new Token", token);
            decodedToken = JwtDecode(token);
        }
        return decodedToken;

    } catch (error) {
        console.log("Error ocuured during get CurrentUser in authService", error);
        return null;
    }
}


export async function getJwt() {
    let token = localStorage.getItem("token");
    if (token) {
        const decodedToken = JwtDecode(token);
        if (Date.now() >= decodedToken.exp * 1000) {
            token = await refreshToken();
        }
    }
    else {
        token = await setJwt();
    }
    return token;
}

