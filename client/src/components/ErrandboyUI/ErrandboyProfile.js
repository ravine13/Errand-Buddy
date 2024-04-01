import React, { useEffect, useState } from "react";
import "./ErrandboyProfile.css";
import profile from "../../assets/profile.png";
import { retrieve } from "../Encryptions";
import { Link, useNavigate } from "react-router-dom";

const ErrandboyProfile = () => {
  const [errandBoy, setErrandBoy] = useState(null);
  const retrievedErrandBoy = retrieve();
  const id = retrievedErrandBoy ? retrievedErrandBoy : null;
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://127.0.0.1:5555/errand_boys/${id}`)
      .then((response) => {
        if (!response.ok) {
          response.json().then((error) => console.log(error));
        }
        return response.json();
      })
      .then((data) => setErrandBoy(data))
      .catch((err) => console.log(err));
  }, []);

  if (!errandBoy) return <div className="loader">Loading...</div>;
  console.log(errandBoy);
  // const errandBoy = errandBoy.errand_boy_profiles[1];

  const handleEditButtonClick = () => {
    navigate("/errand_boy/profile/edit");
  };

  const handleResetPasswordButtonClick = () => {
    navigate("/change_password");
  };

  return (
    <div className="content-wrapper" style={{ marginLeft: "280px", backgroundColor: "white", marginTop: "20px" }}>
      <div className="profile-container">
        <div className="main">
          <div className="row">
            <div className="col md-8 mt-1">
              <div className="card mb-3 content">
                <div className="col-md-3">
                  <img
                    src={
                      errandBoy.profile_picture
                        ? errandBoy.profile_picture
                        : profile
                    }
                    alt="profile"
                    className="profile"
                    width={150}
                  />
                </div>
                <h1 className="m-3 pt-3">{errandBoy.username}</h1>
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-3">
                      <h5>Email</h5>
                    </div>
                    <div className="col-md-9 text-secondary">
                      {errandBoy.email}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-3">
                      <h5>Contact</h5>
                    </div>
                    <div className="col-md-9 text-secondary">
                      {errandBoy.phone_number}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-3">
                      <h5>Location</h5>
                    </div>
                    <div className="col-md-9 text-secondary">
                      {errandBoy.location}
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
      </div>
    </div>
  );
};

export default ErrandboyProfile;
