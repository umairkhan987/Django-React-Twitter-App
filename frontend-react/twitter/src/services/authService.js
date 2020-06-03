import http from "./httpService";
import JwtDecode from "jwt-decode";

const endPoint = "http://127.0.0.1:8000/api/auth/token";


export async function setJwt() {
    const { data } = await http.post(endPoint, { username: "khan", password: "12345" });
    localStorage.setItem("token", data.access);
}

export function getCurrentUser() {
    try {
        const token = localStorage.getItem("token");
        if (!token) {
            console.log("No token found");
            return null;
        }
        const decodedToken = JwtDecode(token);
        if (Date.now() >= decodedToken.exp * 1000) {
            console.log("Token is expired");
            // Generate new Token
            return null;
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
            localStorage.removeItem("token");
            console.log("Token is expired");
            await setJwt();
            token = localStorage.getItem("token");
            console.log("Set the new Token ", token);
        }
    }
    else {
        return null;
    }

    return token;
}

