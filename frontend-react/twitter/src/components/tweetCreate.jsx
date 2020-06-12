import React, { Component } from "react";

class TweetCreate extends Component {
  state = {
    content: "",
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.handleNewTweet(this.state.content);
    this.setState({ content: "" });
  };

  handleChange = (e) => {
    const content = e.currentTarget.value;
    this.setState({ content });
  };

  render() {
    return (
      <div className="row mb-3 mt-1">
        <div className="col-md-5 mx-auto">
          <form action="post" onSubmit={this.handleSubmit}>
            <textarea
              value={this.state.content}
              onChange={this.handleChange}
              className="form-control"
              name="content"
              rows="3"
              placeholder="Share your thought"
              required
            ></textarea>
            <button type="submit" className="btn btn-primary mt-1">
              Tweet
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default TweetCreate;
