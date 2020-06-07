import React, { Component } from "react";
import { Link } from "react-router-dom";

class Login extends Component {
  state = {};
  render() {
    return (
      <div>
        <h1>Login Page Render</h1>
        <Link to="/">Tweets</Link>
      </div>
    );
  }
}

export default Login;
