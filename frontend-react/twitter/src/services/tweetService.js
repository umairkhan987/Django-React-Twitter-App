
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

    xhr.responseType = "json";
    xhr.open("POST", url);
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