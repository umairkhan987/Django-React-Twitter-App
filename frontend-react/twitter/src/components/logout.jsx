import { Component } from "react";
import { logout } from "../services/authService";
import { toast } from "react-toastify";

class Logout extends Component {
  componentDidMount() {
    logout();
    toast.info("Successfully Logout");
    window.location = "/";
  }
  render() {
    return null;
  }
}

export default Logout;
