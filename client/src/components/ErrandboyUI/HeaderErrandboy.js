import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { retrieve } from "../Encryption";
import Logout from "../logout";

const HeaderErrandboy = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5555/logout', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('jwt')}`
        }
      });

      const data = await response.json();

      if (data.detail === 'logged out successful') {
        // If the logout was successful, remove the JWT token from local storage
        localStorage.removeItem('jwt');
        // Redirect the user to the login page or home page
        navigate("/login");
      }
    } catch (error) {
      console.error('Error during logout', error);
      // Handle any errors here
    }
  }

  return (
    <div>
      {/* Navbar */}
      <nav
        className="main-header navbar navbar-expand navbar-white navbar-light"
        style={{ backgroundColor: "#0D98BA" }}
      >
        {/* Left navbar links */}
        <ul className="navbar-nav">
          <li className="nav-item">
            <a
              className="nav-link"
              data-widget="pushmenu"
              href="#"
              role="button"
            >
              <i className="fas fa-bars" />
            </a>
          </li>
          <li
            className="nav-item d-none d-sm-inline-block"
            style={{ marginTop: "10px" }}
          >
            <Link to={"/"} style={{ color: "white" }}>
              Home
            </Link>
          </li>
        </ul>
        {/* Right navbar links */}
        <ul className="navbar-nav ml-auto">
          {/* Navbar Search */}
          <li className="nav-item">
            <div className="navbar-search-block">
              <form className="form-inline">
                <div className="input-group input-group-sm">
                  <input
                    className="form-control form-control-navbar"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                  />
                  <div className="input-group-append">
                    <button className="btn btn-navbar" type="submit">
                      <i className="fas fa-search" />
                    </button>
                    <button
                      className="btn btn-navbar"
                      type="button"
                      data-widget="navbar-search"
                    >
                      <i className="fas fa-times" />
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </li>

          <li className="nav-item">
            <a
              className="nav-link"
              data-widget="fullscreen"
              href="#"
              role="button"
            >
              <i className="fas fa-expand-arrows-alt" />
            </a>
          </li>
          <li
              className="nav-item"
              style={{
                margin: "8px 10px",
                fontSize: "1.5rem",
                color: "#fff",
                cursor: "pointer",
              }}
            >
              <Logout handleLogout={handleLogout} />
              <i className="ri-logout-box-r-line"></i>
            </li>

        </ul>
      </nav>
      {/* /.navbar */}
    </div>
  );
};

export default HeaderErrandboy;
