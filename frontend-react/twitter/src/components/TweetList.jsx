import React, { useState, useEffect } from "react";

import Tweet from "./tweet";

const TweetList = () => {
  const [tweets, setTweets] = useState([{}, {}]);

  const handleAction = (tweet, action) => {
    if (action === "like") {
      const allTweets = [...tweets];
      const index = allTweets.indexOf(tweet);
      allTweets[index] = { ...tweet };
      allTweets[index].likes++;
      setTweets(allTweets);
    }
  };

  function loadTweet(callBack) {
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

  useEffect(() => {
    const myCallBack = (response, status) => {
      if (status === 200) {
        setTweets(response);
      } else {
        alert("There was an error.");
      }
    };

    loadTweet(myCallBack);
  }, []);

  return tweets.map((item, index) => {
    return <Tweet tweet={item} handleAction={handleAction} key={index} />;
  });
};

export default TweetList;
