import http from "./httpService";
import JwtDecode from "jwt-decode";

const endPoint = "http://127.0.0.1:8000/api/auth/token";

// http.setJwt(localStorage.getItem("token"));

export async function login(username, password) {
    const { data } = await http.post(endPoint, { username: username, password: password });
    localStorage.setItem("token", data.access);
}

export function logout() {
    const token = localStorage.getItem("token");
    if (token !== null)
        localStorage.removeItem("token");
}

export function getCurrentUser() {
    try {
        let token = localStorage.getItem("token");
        return JwtDecode(token);
    } catch (ex) {
        return null;
    }
}

export function getJwt() {
    try {
        let token = localStorage.getItem("token");
        return token;
    } catch (ex) {
        return null;
    }
}

