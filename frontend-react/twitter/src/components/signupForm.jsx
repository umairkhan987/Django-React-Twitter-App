import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import { Link } from "react-router-dom";
import { register } from "./../services/userService";

class SignupForm extends Form {
  state = {
    data: { first_name: "", last_name: "", username: "", password: "" },
    errors: {},
  };

  schema = {
    first_name: Joi.string().required().label("First Name"),
    last_name: Joi.string().required().label("Last Name"),
    username: Joi.string().required().label("Username"),
    password: Joi.string().min(8).max(20).required().label("Password"),
  };

  doSubmit = async () => {
    try {
      const response = await register(this.state.data);
      if (response.status === 201) this.props.history.push("/login");
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data.username[0];
        this.setState({ errors });
      }
    }
  };

  render() {
    return (
      <React.Fragment>
        <div className="col-md-6 container ">
          <h1 className="text-center">SignUp Form</h1>
          <form onSubmit={this.handleSubmit}>
            {this.renderInput("first_name", "First Name")}
            {this.renderInput("last_name", "Last Name")}
            {this.renderInput("username", "Username")}
            {this.renderInput("password", "Password", "password")}
            {this.renderButton("Register")}
          </form>
          <p className="text-center mt-2">
            Already have an account? <Link to="/login">Sign In</Link>
          </p>
        </div>
      </React.Fragment>
    );
  }
}

export default SignupForm;
