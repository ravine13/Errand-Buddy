import React from "react";
import { Link, useParams } from "react-router-dom";
import { retrieve } from "../Encryption";

const SideNavErrandboy = () => {
  const retrievedErrandBoy = retrieve().errandBoy;
  const errandBoyId = retrievedErrandBoy ? retrievedErrandBoy.id : null;
  return (
    <div>
      <div>
        {/* Main Sidebar Container */}
        <aside className="main-sidebar sidebar-dark-primary elevation-4" >
          <Link to="index3.html" className="brand-link">
            <span
              className="brand-text font-weight-light"
              style={{ marginLeft: "70px" }}
            >
              EB
            </span>
          </Link>

          <div className="sidebar">
            <div className="user-panel mt-3 pb-3 mb-3 d-flex">
            <div className=""  style={{marginLeft:"30px",color:"white",font:"helvetica"}}>
     
     Errand Boy's DashBoard
   

</div>
</div>
            {/* SidebarSearch Form */}
            <div className="form-inline">
              
            </div>
            {/* Sidebar Menu */}
            <nav className="mt-2">
              <ul
                className="nav nav-pills nav-sidebar flex-column"
                data-widget="treeview"
                role="menu"
                data-accordion="false"
              >
              

                <li className="nav-item">
                  <Link to={"/errandboy/profile"} className="nav-link">
                    <i className="nav-icon fas fa-user-circle" />
                    <p>
                      Profile
                    </p>
                  </Link>
                </li>

               
              </ul>
            </nav>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default SideNavErrandboy;
