import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import {
  getUserProfile,
  updateUserProfile,
} from "./../services/profileService";
import ProfileBadge from "./common/profileBadge";

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
    console.log("componentDidMount");
    try {
      getUserProfile().then(({ data }) => {
        const obj = {
          first_name: data.user.first_name || "",
          last_name: data.user.last_name || "",
          location: data.location || "",
          bio: data.bio || "",
        };
        this.setState({ data: obj });
      });

      // // console.log(obj);
      // this.setState({ data: obj });
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
    console.log("Render method");
    const { data } = this.state;

    console.log(data);
    return (
      <React.Fragment>
        <ProfileBadge data={data} />
        <form onSubmit={this.handleSubmit} className="pt-4">
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
