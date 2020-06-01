import React, { useState, useEffect } from "react";

import Tweet from "./tweet";
import TweetCreate from "./tweetCreate";
import { getTweets, createTweet } from "./../services/tweetService";

const TweetList = () => {
  const [tweets, setTweets] = useState([]);
  const [userLike, setUserLike] = useState(false);

  const handleAction = (tweet, action) => {
    if (action === "like") {
      const allTweets = [...tweets];
      const index = allTweets.indexOf(tweet);
      allTweets[index] = { ...tweet };
      if (userLike === true) {
        allTweets[index].likes--;
        setUserLike(false);
      } else {
        allTweets[index].likes++;
        setUserLike(true);
      }

      setTweets(allTweets);
    }
  };

  const handleNewTweet = (newTweet) => {
    const tempTweets = [...tweets];
    // send data to server to create a new tweet
    createTweet({ content: newTweet }, (response, status) => {
      if (status === 201) {
        tempTweets.unshift(response);
        setTweets(tempTweets);
      }
    });
  };

  useEffect(() => {
    const myCallBack = (response, status) => {
      if (status === 200) {
        setTweets(response);
      } else {
        alert(response.message);
      }
    };

    getTweets(myCallBack);
  }, []);

  return (
    <React.Fragment>
      <TweetCreate handleNewTweet={handleNewTweet} />

      {tweets.map((item, index) => {
        return <Tweet tweet={item} handleAction={handleAction} key={index} />;
      })}
    </React.Fragment>
  );
};

export default TweetList;
