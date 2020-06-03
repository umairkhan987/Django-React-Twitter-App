import { getCurrentUser, getJwt } from "./authService";
import http from "./httpService";

const endPoint = "http://localhost:8000/api/tweets";


// using axios third party to get list of tweets
export function getTweetsAxios() {
    // checkToken();

    const result = getCurrentUser();
    if (result) console.log(result);

    const response = http.get(endPoint);
    return response;
}

// using axios third party to get list of tweets
export async function createTweetsAxios(data) {
    const token = await getJwt();
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    const response = http.post(endPoint + "/create", data, config);
    return response;
}


// using Ajax to get list of tweets
export function getTweets(callBack) {
    const xhr = new XMLHttpRequest();
    const method = "Get";
    const url = "http://localhost:8000/api/tweets";

    xhr.responseType = "json";
    xhr.open(method, url);
    xhr.onload = function () {
        callBack(xhr.response, xhr.status);
    };
    xhr.onerror = function () {
        console.log("There was some error on server side");
        callBack({ message: "The request was an error" }, 400);
    };
    xhr.send();
}



export function createTweet(newTweet, callBack) {
    console.log("newTweet value inside service ", newTweet);
    const jsonData = JSON.stringify(newTweet);

    const xhr = new XMLHttpRequest();
    const url = "http://localhost:8000/api/tweets/create";

    xhr.open("POST", url);
    // xhr.responseType = "json";
    xhr.setRequestHeader("Content-Type", "application/json");
    // xhr.setRequestHeader("HTTP_X_REQUESTED_WITH", "XMLHttpRequest");
    // xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");

    xhr.onload = function () {
        console.log("status ", xhr.status);
        console.log("response ", xhr.response);

        callBack(xhr.response, xhr.status);
    }

    xhr.onerror = function () {
        console.log("There was some error on server side");
        callBack({ message: "The request was an error" }, 400);
    }
    xhr.send(jsonData);
}