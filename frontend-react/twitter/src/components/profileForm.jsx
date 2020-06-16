import React from "react";
import Joi from "joi-browser";
import { toast } from "react-toastify";
import Form from "./common/form";
import {
  getUserProfile,
  updateUserProfile,
} from "./../services/profileService";
import ProfileBadge from "./common/profileBadge";

class ProfileForm extends Form {
  state = {
    data: {
      first_name: "",
      last_name: "",
      location: "",
      bio: "",
      username: "",
    },
    errors: {},
  };

  schema = {
    first_name: Joi.string().allow("").label("First Name"),
    last_name: Joi.string().allow("").label("Last Name"),
    location: Joi.string().allow("").label("Location"),
    bio: Joi.string().max(500).allow("").label("Bio"),
  };

  async componentDidMount() {
    try {
      const { data } = await getUserProfile();
      // console.log(data);
      const obj = {
        first_name: data.first_name || "",
        last_name: data.last_name || "",
        location: data.location || "",
        bio: data.bio || "",
        username: data.username || "",
        follower_count: data.follower_count,
        following_count: data.following_count,
        is_following: data.is_following,
        id: data.id,
      };
      this.setState({ data: obj });
    } catch (ex) {
      if (ex.response && ex.response.status === 401) {
        // console.log(ex.response.data["detail"]);
        toast.error("You must login to perform this action");
        this.props.history.replace("/login");
        console.clear();
      }
    }
  }

  doSubmit = async () => {
    try {
      const data = this.state.data;
      const response = await updateUserProfile(data);
      if (response.status === 200) {
        toast.success("Updated successfully");
        // console.log("Successfully updated");
      }
    } catch (ex) {
      if (ex.response && ex.response.status === 401) {
        console.log(ex.response.data["detail"]);
        toast.error("You must login to perform this action");
        this.props.history.replace("/login");
        console.clear();
      }
      toast.info(ex.response.data["detail"]);
    }
  };

  render() {
    const { data } = this.state;

    // console.log(data);
    return (
      <React.Fragment>
        <ProfileBadge user={data} ownProfile />
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
