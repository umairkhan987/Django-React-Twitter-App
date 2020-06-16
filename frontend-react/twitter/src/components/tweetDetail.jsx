import React, { Component } from "react";
import { tweetDetail } from "../services/tweetService";
import Tweet from "./tweet";
import { toast } from "react-toastify";

class TweetDetail extends Component {
  state = {
    tweet: "",
    prevId: "",
  };

  async componentDidMount() {
    const id = this.props.match.params.id;
    if (isNaN(id)) return toast.error("'ID' is not integer.");

    try {
      const response = await tweetDetail(id);
      if (response.status === 200) {
        this.setState({ tweet: response.data, prevId: id });
      }
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        toast.error("Tweet is not found.");
      }
    }
  }

  async componentDidUpdate() {
    const id = this.props.match.params.id;
    if (isNaN(id)) return toast.error("'ID' is not integer.");

    if (this.state.prevId !== id) {
      try {
        const response = await tweetDetail(id);
        if (response.status === 200) {
          this.setState({ tweet: response.data, prevId: id });
        }
      } catch (ex) {
        if (ex.response && ex.response.status === 404) {
          toast.error("Tweet is not found.");
        }
      }
    }
  }

  render() {
    return (
      <React.Fragment>
        {this.state.tweet && (
          <Tweet
            tweet={this.state.tweet}
            history={this.props.history}
            className="col-12 col-md-10 mx-auto border rounded my-3 py-4"
          />
        )}
      </React.Fragment>
    );
  }
}

export default TweetDetail;
