import React from "react";
import "./profileBadge.css";
import { getCurrentUser } from "./../../services/authService";

const ProfileBadge = ({ user, ownProfile, didFollowToggle }) => {
  // const [user, setUser] = useState(user ? user : null);
  const className =
    ownProfile === true
      ? "col-8 mx-auto border rounded py-3"
      : "col-12 col-md-10 mx-auto border rounded py-2";

  let followUnfollow =
    user && user.is_following === true ? "Unfollow" : "Follow";

  let showButton = true;
  if (ownProfile) {
    showButton = false;
  } else {
    let currentUser = getCurrentUser();
    if (user && currentUser && user.username === currentUser.username)
      showButton = false;
  }

  return user ? (
    <div className="row">
      <div className={`${className} profile_color`}>
        <div className="card_height">
          {/* */}
          <div className="row h-100 align-content-center ">
            <div className="profile-pic col-auto">
              <span className=" px-3 py-2 mx-1 rounded-circle bg-dark text-white">
                {user.username && user.username[0].toUpperCase()}
              </span>
              <p className="mt-3">{user.location}</p>
            </div>

            {/*  */}
            <div className="profile_info col-auto">
              <span>
                {user.first_name} {user.last_name}
              </span>
              <br />
              <span>@{user.username}</span>
            </div>

            <div
              className="col-auto"
              // style={{ background: "green", marginTop: "-9px" }}
            >
              <span>followers {user.follower_count}</span>
              <span className="ml-3">following {user.following_count}</span>
            </div>
            {showButton === true ? (
              <div className="col-auto">
                <button
                  onClick={() => didFollowToggle(followUnfollow)}
                  className="btn btn-primary"
                >
                  {followUnfollow}
                </button>
              </div>
            ) : null}
          </div>
        </div>
        <div className="row justify-content-center">
          <p>{user.bio}</p>
        </div>
      </div>
    </div>
  ) : null;
};

export default ProfileBadge;
