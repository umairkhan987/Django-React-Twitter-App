import React, { Component } from "react";
import Tweet from "./tweet";
import TweetCreate from "./tweetCreate";
import { feedList, createTweet } from "./../services/tweetService";

class FeedTweet extends Component {
  state = {
    tweets: [],
    nextUrl: null,
  };

  async componentDidMount() {
    try {
      const { data } = await feedList();
      this.setState({
        tweets: data.results,
        nextUrl: data.next,
      });
    } catch (ex) {
      if (ex.response && ex.response.status === 401) {
        console.log(ex.response.data["detail"]);
        // this.props.history.replace("/login");
      }
    }
  }

  // create new Tweet method
  handleNewTweet = async (newTweet) => {
    try {
      const { data } = await createTweet({
        content: newTweet,
      });
      const tweets = [data, ...this.state.tweets];
      this.setState({ tweets });
    } catch (ex) {
      if (ex.response && ex.response.status === 401) {
        this.props.history.push("/login");
        console.clear();
      }
    }
  };

  handleUpdateRetweet = (tweet) => {
    const allTweets = [tweet, ...this.state.tweets];
    this.setState({ tweets: allTweets });
  };

  handleLoadNext = async () => {
    const { nextUrl, tweets } = this.state;
    const { data } = await feedList(nextUrl);
    const newTweets = [...tweets].concat(data.results);
    this.setState({
      tweets: newTweets,
      nextUrl: data.next,
    });
  };

  render() {
    const { tweets, nextUrl } = this.state;
    return (
      <React.Fragment>
        <TweetCreate handleNewTweet={this.handleNewTweet} />
        <div className="row">
          {tweets.map((item, index) => {
            return (
              <Tweet
                history={this.props.history}
                tweet={item}
                updateTweet={this.handleUpdateRetweet}
                key={index}
                className="col-12 col-md-10 mx-auto border rounded my-3 py-4"
                hideLink
              />
            );
          })}
          {nextUrl !== null && (
            <button
              className="btn btn-outline-primary col-md-10 mx-auto mb-4"
              onClick={this.handleLoadNext}
            >
              Load Tweet
            </button>
          )}
        </div>
      </React.Fragment>
    );
  }
}

export default FeedTweet;
