import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import {
  getUserProfile,
  updateUserProfile,
} from "./../services/profileService";

class ProfileForm extends Form {
  state = {
    data: { first_name: "", last_name: "", location: "", bio: "" },
    errors: {},
  };

  schema = {
    first_name: Joi.string().label("First Name"),
    last_name: Joi.string().label("Last Name"),
    location: Joi.string().label("Location"),
    bio: Joi.string().max(500).label("Bio"),
  };

  async componentDidMount() {
    try {
      const { data } = await getUserProfile();
      const obj = {
        first_name: data.user.first_name,
        last_name: data.user.last_name,
        location: data.location,
        bio: data.bio,
      };
      this.setState({ data: obj });
    } catch (ex) {
      if (ex.response && ex.response.status === 401) {
        console.log(ex.response.data["detail"]);
        this.props.history.replace("/login");
      }
    }
  }

  doSubmit = async () => {
    try {
      const data = this.state.data;
      const response = await updateUserProfile(data);
      if (response.status === 200) console.log("Successfully updated");
    } catch (ex) {
      if (ex.response && ex.response.status === 401) {
        console.log(ex.response.data["detail"]);
        this.props.history.replace("/login");
      }
      console.log(ex);
    }
    console.log("data ", this.state.data);
  };

  render() {
    return (
      <React.Fragment>
        <h1 className="text-center">Profile Khan</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="row justify-content-center">
            <div className="col-4">
              {this.renderInput("first_name", "First Name")}
            </div>
            <div className="col-4">
              {this.renderInput("last_name", "Last Name")}
            </div>
            <div className="col-8">
              {this.renderInput("location", "Location")}
            </div>
            <div className="col-8">{this.renderTextArea("bio", "Bio")}</div>
            <div className="col-8">{this.renderButton("Save")}</div>
          </div>
        </form>
      </React.Fragment>
    );
  }
}

export default ProfileForm;
