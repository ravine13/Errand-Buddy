import React, { useEffect, useState } from "react";
import "./ErrandboyProfile.css";
import { retrieve } from "../Encryption";
import profile from "../../assets/profile.png";
import { Link, Route, useNavigate,useParams } from "react-router-dom";

const ErrandboyProfile = () => {
  const [errandBoy, setErrandBoy] = useState(null);
  const {id} = useParams()
  console.log(id);
  // const retrievedUser = retrieve().user.id;
  // const id = retrievedUser ? retrievedUser.id : null;
  // console.log(retrievedUser);
  const navigate = useNavigate();

  // console.log('retrievedErrandBoy:', retrievedErrandBoy);
  // console.log('id:', id);

  useEffect(() => {
    fetch(`http://127.0.0.1:5555/errand_boys/${id}`)
      .then((response) => {
        const resp = response.clone();
        if (!response.ok) {
          resp.json().then((error) => console.log(error));
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Response data:', data);
        if (!data || !data.errand_boy_profiles || data.errand_boy_profiles.length === 0) {
          navigate("/errand_boy/profile/create");
        } else {
          setErrandBoy(data);
        }
      })
      .catch((err) => console.log(err));
  }, []);
  // console.log(errandBoy);
  if (!errandBoy) return <div className="loader">loading...</div>;
  console.log(errandBoy);
  if (!errandBoy || !errandBoy.errand_boy_profiles || errandBoy.errand_boy_profiles.length === 0)
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
