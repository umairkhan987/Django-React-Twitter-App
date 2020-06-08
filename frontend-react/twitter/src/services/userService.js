import http from "./httpService";

export function register(user) {
    return http.post("http://127.0.0.1:8000/api/auth/register", user);
}