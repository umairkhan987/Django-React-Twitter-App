import React, { useState } from "react";

const ProfileBadge = ({ data }) => {
  const [user, setUser] = useState(data ? data : null);
  //   console.log(user);
  return (
    <div className="row justify-content-center">
      <div className="col-8 ">
        <div className="border rounded py-4 px-2">
          <span className="mx-1 px-3 py-2 rounded-circle bg-dark text-white">
            {/* {user.first_name[0]} */}K
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProfileBadge;
