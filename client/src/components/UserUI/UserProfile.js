import React, { useState, useEffect } from "react";
import "./UserProfile.css";
import profile from "../../assets/profile.png";
import { Link, useNavigate } from "react-router-dom";
import { retrieve } from "../Encryption";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const retrievedUser = retrieve();
  console.log(retrievedUser.sub);
  const id = retrievedUser ? retrievedUser.sub : null;
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`/user/${id}`)
      .then((response) => response.json())
      .then((data) => setUser(data))
      .catch((err) => console.log(err));
  }, []);

  if (!user) return <div className="loader"></div>;
  console.log(user);
  if (user?.user_profile?.length === 0)
    return navigate(`/user/create_profile`);
  // const userProfileData = user?.user_profile[0];

  function handleLogout(e) {
    fetch("/logout", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + retrieve().access_token,
      },
    }).then((resp) => {
      if (resp.ok) {
        localStorage.clear();
        navigate("/login");
      }
    });
  }

  const handleEditButtonClick = () => {
    navigate("/user/user_update_profile");
  };
  const handleResetPasswordButtonClick = () => {
    navigate("/change_password");
  };

  return (
    <div
      className="content-wrapper"
      style={{
        marginLeft: "280px",
        backgroundColor: "white",
        marginTop: "20px",
      }}
    >
      <div className="profile-container">
        <div className="main">
          <div className="row">
            <div className="col md-8 mt-1">
              <div className="card mb-3 content">
                <div className="col-md-3">
                  <img
                    src={user?.profile_picture || profile}
                    alt="profile"
                    className="profile"
                    width={150}
                  />
                </div>
                <h1 className="m-3 pt-3">{user?.username}</h1>
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-3">
                      <h5>Email</h5>
                    </div>
                    <div className="col-md-9 text-secondary">
                      {user?.email}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-3">
                      <h5>Location</h5>
                    </div>
                    <div className="col-md-9 text-secondary">
                      {user?.location}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-3">
                      <h5>Contact</h5>
                    </div>
                    <div className="col-md-9 text-secondary">
                      {user?.phone_number}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button
            type="update"
            className="btn btn-primary"
            onClick={handleEditButtonClick}
          >
            Edit Profile
          </button>
          <button
            type="update"
            className="btn btn-primary"
            onClick={handleResetPasswordButtonClick}
          >
            Reset Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;

