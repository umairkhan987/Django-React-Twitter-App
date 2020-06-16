import React from "react";
import { Link } from "react-router-dom";

export const UserPicture = ({ user }) => {
  return (
    <div className="">
      <Link to={`/tweets/profile/${user.username}`}>
        <span className="mx-1 px-3 py-2 rounded-circle bg-dark text-white">
          {user.username[0]}
        </span>
      </Link>
    </div>
  );
};

export const UserDisplay = ({ user, includeFullName }) => {
  const displayName =
    includeFullName === true ? `${user.first_name} ${user.last_name} ` : null;

  return (
    <React.Fragment>
      {displayName}
      <Link
        to={`/tweets/profile/${user.username}`}
        style={{ textDecoration: "none" }}
      >
        @{user.username}
      </Link>
    </React.Fragment>
  );
};
