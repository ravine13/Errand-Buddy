import React, { useEffect, useState } from "react";
import "./ErrandboyProfile.css";
import { retrieve } from "../Encryption";
import profile from "../../assets/profile.png";
import { Link, useNavigate } from "react-router-dom";

const ErrandboyProfile = () => {
  const [errandBoy, setErrandBoy] = useState(null);
  const retrievedErrandBoy = retrieve().errandBoy;
  const id = retrievedErrandBoy ? retrievedErrandBoy.id : null;
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`/errand_boys/${id}`)
      .then((response) => {
        if (!response.ok) {
          response.json().then((error) => console.log(error));
        }
        return response.json();
      })
      .then((data) => setErrandBoy(data))
      .catch((err) => console.log(err));
  }, []);
  console.log(errandBoy);
  if (!errandBoy) return <div className="loader">loading...</div>;
  console.log(errandBoy);
  if (errandBoy?.errand_boy_profiles?.length === 0)
    return navigate("/errand_boy/profile/create");
  const errandBoyProfileData = errandBoy.errand_boy_profiles[0];

  const handleEditButtonClick = () => {
    navigate("/errand_boy/profile/edit");
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
                    src={
                      errandBoyProfileData.profile_picture
                        ? errandBoyProfileData.profile_picture
                        : profile
                    }
                    alt="profile"
                    className="profile"
                    width={150}
                  />
                </div>
                <h1 className="m-3 pt-3">{errandBoyProfileData.username}</h1>
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
