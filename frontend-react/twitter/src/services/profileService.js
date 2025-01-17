import http from "./httpService";
import { getJwt } from "./authService";

const endPoint = "http://localhost:8000/api/auth/profile";


export function getUserProfile() {
    http.setJwt(getJwt());
    return http.get(endPoint)
}

export function updateUserProfile(data) {
    http.setJwt(getJwt());
    return http.put(endPoint + "/update", data);
}

export function getOtherUserProfile(username) {
    if (getJwt() !== null)
        http.setJwt(getJwt());

    return http.get(endPoint + "/" + username);
}

export function followOrUnfollowUser(username, data) {
    http.setJwt(getJwt());
    return http.post(endPoint + "/" + username + "/follow", data);
}