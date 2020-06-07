import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <React.Fragment>
      <nav className="navbar bg-tweetme navbar-expand-lg navbar-dark mb-4 ">
        <Link className="navbar-brand" to="/">
          Tweetme
        </Link>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto d-none">
            <li className="nav-item active">
              {/* <a className="nav-link">
                Home <span className="sr-only">(current)</span>
              </a> */}
            </li>
            <li className="nav-item">
              {/* <a className="nav-link">Link</a> */}
            </li>
          </ul>
        </div>
      </nav>
    </React.Fragment>
  );
};

export default NavBar;
