import React, { Component } from "react";
import Tweet from "./tweet";
import TweetCreate from "./tweetCreate";

import {
  getTweetsAxios,
  createTweetsAxios,
  tweetAction,
} from "./../services/tweetService";

class TweetList extends Component {
  state = {
    tweets: [],
  };

  async componentDidMount() {
    const { data: tweets } = await getTweetsAxios();
    this.setState({ tweets });
  }

  // create new Tweet method
  handleNewTweet = async (newTweet) => {
    try {
      const { data } = await createTweetsAxios({
        content: newTweet,
      });
      const tweets = [data, ...this.state.tweets];
      this.setState({ tweets });
    } catch (ex) {
      if (ex.response && ex.response.status === 401) {
        alert("Unauthorized access");
        console.log(ex.response);
      }
    }
  };

  // handle Action method (like, unlike and retweet)
  handleAction = async (tweet, action) => {
    const obj = { action: action, id: tweet.id };
    const allTweets = [...this.state.tweets];
    const index = allTweets.indexOf(tweet);
    allTweets[index] = { ...tweet };
    try {
      const { data } = await tweetAction(obj);
      console.log(data);
      allTweets[index].likes = data.likes;
    } catch (ex) {
      console.log("like action error ", ex);
    }
    this.setState({ tweets: allTweets });
  };

  render() {
    const { tweets } = this.state;
    return (
      <React.Fragment>
        <TweetCreate handleNewTweet={this.handleNewTweet} />

        {tweets.map((item, index) => {
          return (
            <Tweet tweet={item} handleAction={this.handleAction} key={index} />
          );
        })}
      </React.Fragment>
    );
  }
}

export default TweetList;

// const TweetList = () => {
//   const [tweets, setTweets] = useState([]);
//   const [userLike, setUserLike] = useState(false);

//   const handleAction = (tweet, action) => {
//     if (action === "like") {
//       const allTweets = [...tweets];
//       const index = allTweets.indexOf(tweet);
//       allTweets[index] = { ...tweet };
//       if (userLike === true) {
//         allTweets[index].likes--;
//         setUserLike(false);
//       } else {
//         allTweets[index].likes++;
//         setUserLike(true);
//       }

//       setTweets(allTweets);
//     }
//   };

//   const handleNewTweet = async (newTweet) => {
//     // const tempTweets = [...tweets];

//     // send data to server to create a new tweet using Axios
//     try {
//       const response = await createTweetsAxios({
//         content: newTweet,
//       });
//       console.log(response);
//     } catch (ex) {
//       if (ex.response && ex.response.status === 401) {
//         alert(ex.response.data["detail"]);
//         console.log(ex.response);
//       }
//     }
//     // send data to server to create a new tweet using Ajax
//     // createTweet({ content: newTweet, username: "khan" }, (response, status) => {
//     //   if (status === 201) {
//     //     tempTweets.unshift(response);
//     //     setTweets(tempTweets);
//     //   }
//     // });
//   };

//   // using axios third party to get list of tweets
//   useEffect(() => {
//     const fetchData = async () => {
//       const { data } = await getTweetsAxios();
//       setTweets(data);
//     };
//     fetchData();
//   }, []);

//   // using ajax call to get data
//   // useEffect(() => {
//   //   const myCallBack = (response, status) => {
//   //     console.log(response);
//   //     console.log(status);
//   //     if (status === 200) {
//   //       setTweets(response);
//   //     } else {
//   //       alert(response.message);
//   //     }
//   //   };
//   //   getTweets(myCallBack);
//   // }, []);

//   return (
//     <React.Fragment>
//       <TweetCreate handleNewTweet={handleNewTweet} />

//       {tweets.map((item, index) => {
//         return <Tweet tweet={item} handleAction={handleAction} key={index} />;
//       })}
//     </React.Fragment>
//   );
// };

// export default TweetList;
