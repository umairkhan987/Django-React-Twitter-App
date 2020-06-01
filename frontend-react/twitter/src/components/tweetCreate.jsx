import React, { Component } from "react";

class TweetCreate extends Component {
  state = {
    content: "",
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.handleNewTweet(this.state.content);
  };

  handleChange = (e) => {
    const content = e.currentTarget.value;
    this.setState({ content });
  };

  render() {
    return (
      <div>
        <div className="col-12 mb-3">
          <form action="post" onSubmit={this.handleSubmit}>
            <textarea
              value={this.state.content}
              onChange={this.handleChange}
              className="form-control"
              name="content"
              rows="3"
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
