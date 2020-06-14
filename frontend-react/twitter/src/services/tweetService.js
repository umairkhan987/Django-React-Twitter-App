import { getJwt, getCurrentUser } from "./authService";
import http from "./httpService";

let endPoint = "http://localhost:8000/api/tweets";

export function getTweetsList(nextUrl = null) {

    const data = getCurrentUser();
    let response = null;

    if (nextUrl !== null && nextUrl !== undefined) {
        endPoint = nextUrl;
    }

    if (data !== null) {
        http.setJwt(getJwt());
        response = http.get(endPoint + "/feed");
    } else {
        response = http.get(endPoint);
    }
    return response;
}

export function feedList(nextUrl = null) {
    endPoint = endPoint + "/feed";
    if (nextUrl !== null && nextUrl !== undefined) {
        endPoint = nextUrl;
    }

    http.setJwt(getJwt());
    return http.get(endPoint);
}

export function createTweet(data) {
    http.setJwt(getJwt());
    const response = http.post(endPoint + "/create", data);
    return response;
}

export async function tweetAction(data) {
    http.setJwt(getJwt());
    const response = http.post(endPoint + "/action", data);
    return response;
}

export function tweetDetail(tweet_id) {
    return http.get(endPoint + "/" + tweet_id);
}
// using Ajax to get list of tweets
// export function getTweets(callBack) {
//     const xhr = new XMLHttpRequest();
//     const method = "Get";
//     const url = "http://localhost:8000/api/tweets";

//     xhr.responseType = "json";
//     xhr.open(method, url);
//     xhr.onload = function () {
//         callBack(xhr.response, xhr.status);
//     };
//     xhr.onerror = function () {
//         console.log("There was some error on server side");
//         callBack({ message: "The request was an error" }, 400);
//     };
//     xhr.send();
// }



// export function createTweet(newTweet, callBack) {
//     console.log("newTweet value inside service ", newTweet);
//     const jsonData = JSON.stringify(newTweet);

//     const xhr = new XMLHttpRequest();
//     const url = "http://localhost:8000/api/tweets/create";

//     xhr.open("POST", url);
//     // xhr.responseType = "json";
//     xhr.setRequestHeader("Content-Type", "application/json");
//     // xhr.setRequestHeader("HTTP_X_REQUESTED_WITH", "XMLHttpRequest");
//     // xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");

//     xhr.onload = function () {
//         console.log("status ", xhr.status);
//         console.log("response ", xhr.response);

//         callBack(xhr.response, xhr.status);
//     }

//     xhr.onerror = function () {
//         console.log("There was some error on server side");
//         callBack({ message: "The request was an error" }, 400);
//     }
//     xhr.send(jsonData);
// }


// const config = {
    //     headers: { Authorization: `Bearer ${token}` }
    // };
