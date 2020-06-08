import React, { Component } from "react";
import { tweetDetail } from "../services/tweetService";
import Tweet from "./tweet";

class TweetDetail extends Component {
  state = {
    tweet: "",
    prevId: "",
  };

  async componentDidMount() {
    const id = this.props.match.params.id;
    try {
      const response = await tweetDetail(id);
      if (response.status === 200) {
        this.setState({ tweet: response.data, prevId: id });
      }
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        alert("Tweet is not found.");
      }
    }
  }

  async componentDidUpdate() {
    const id = this.props.match.params.id;
    if (this.state.prevId !== id) {
      try {
        const response = await tweetDetail(id);
        if (response.status === 200) {
          this.setState({ tweet: response.data, prevId: id });
        }
      } catch (ex) {
        if (ex.response && ex.response.status === 404) {
          alert("Tweet is not found.");
        }
      }
    }
  }

  render() {
    return (
      <React.Fragment>
        {this.state.tweet && (
          <Tweet tweet={this.state.tweet} history={this.props.history} />
        )}
      </React.Fragment>
    );
  }
}

export default TweetDetail;
