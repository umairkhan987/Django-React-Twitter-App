import React, { Component } from "react";
import Tweet from "./tweet";
import { getOtherUserTweets, createTweet } from "../services/tweetService";
import {
  getOtherUserProfile,
  followOrUnfollowUser,
} from "./../services/profileService";
import ProfileBadge from "./common/profileBadge";
import { toast } from "react-toastify";

class OtherUserTweet extends Component {
  state = {
    tweets: [],
    user: "",
    username: "",
    nextUrl: null,
  };

  // get tweets of given username
  getTweets = async (username) => {
    try {
      const response = await getOtherUserTweets(null, username);
      this.setState({
        tweets: response.data.results,
        nextUrl: response.data.next,
      });
    } catch (ex) {
      toast.error(ex.response.data["detail"]);
    }
  };

  getUser = async (username) => {
    try {
      const { data } = await getOtherUserProfile(username);
      this.setState({ user: data });
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        toast.error(ex.response.data["detail"]);
      }
    }
  };

  async componentDidMount() {
    const username = this.props.match.params.username;
    if (username !== null) {
      await this.getUser(username);
      await this.getTweets(username);
      this.setState({ username });
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
        toast.error("You must login to perform this action");
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
    const response = await getOtherUserTweets(nextUrl, null);
    const newTweets = [...tweets].concat(response.data.results);
    this.setState({
      tweets: newTweets,
      nextUrl: response.data.next,
    });
  };

  handleNewFollow = async (actonVerb) => {
    const action = actonVerb.toLowerCase();
    const data = { action: action };
    const { username } = this.state;

    try {
      const { data: user } = await followOrUnfollowUser(username, data);
      this.setState({ user });
    } catch (ex) {
      if (ex.response && ex.response.status === 401) {
        toast.error("You must login to perform this action");
        // console.log(ex.response.data["detail"]);
        this.props.history.push("/login");
        console.clear();
      }
      toast.info(ex.response.data["detail"]);
    }
  };

  render() {
    const { tweets, nextUrl, user } = this.state;

    return (
      <React.Fragment>
        {user && (
          <ProfileBadge user={user} didFollowToggle={this.handleNewFollow} />
        )}
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

export default OtherUserTweet;
