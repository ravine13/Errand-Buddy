import React from "react";
import { Link, useParams } from "react-router-dom";
import { retrieve } from "../Encryption";

const SideNavErrandboy = () => {
  // const {employeeId} =useParams().id
  const employeeId = retrieve().employee.id;
  return (
    <div>
      <div>
        {/* Main Sidebar Container */}
        <aside className="main-sidebar sidebar-dark-primary elevation-4" >
          <a href="index3.html" className="brand-link">
            <span
              className="brand-text font-weight-light"
              style={{ marginLeft: "70px" }}
            >
              EB
            </span>
          </a>

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
                  <a href="#" className="nav-link">
                    <i className="nav-icon fas fa-user-circle" />
                    <p>
                      <Link to={"/errandboy/profile"}>Profile</Link>
                    </p>
                  </a>
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