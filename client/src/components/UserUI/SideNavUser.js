import React from 'react'
import { Link } from 'react-router-dom';
import { retrieve } from '../Encryption'

const SideNavUser = () => {
  const retrievedUser = retrieve().user;
  const userId = retrievedUser ? retrievedUser.id : null;
  return (
    <div>
         <div>
 {/* Main Sidebar Container */}
<aside className="main-sidebar sidebar-dark-primary elevation-4">
  {/* Brand Logo */}
  <a href="index3.html" className="brand-link">
    {/* <img src="dist/img/AdminLTELogo.png" alt="AdminLTE Logo" className="brand-image img-circle elevation-3" style={{opacity: '.8'}} /> */}
    <span className="brand-text font-weight-light" style={{ marginLeft: "70px"}}>EB</span>
  </a>
  {/* Sidebar */}
  <div className="sidebar">
    {/* Sidebar user panel (optional) */}
    <div className="user-panel mt-3 pb-3 mb-3 d-flex">
      <div className=""  style={{marginLeft:"30px",color:"white",font:"helvetica"}}>
     
              User's DashBoard
            
     
      </div>
      
    </div>
    {/* SidebarSearch Form */}
    
    {/* Sidebar Menu */}
    <nav className="mt-2">
      <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">

      <li className="nav-item">
          <Link to="/user/profile" className="nav-link">
          <i className="nav-icon fas fa-user-circle" />
            <p>
              Profile
            </p>
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/user/messages" className="nav-link">
          <i className="nav-icon fas fa-comments" />
            <p>
              Messages
            </p>
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/user/notifications" className="nav-link">
          <i className="nav-icon fas fa-bell" />
            <p>
              Notifications
            </p>
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/user/tasks" className="nav-link">
          <i className="nav-icon fas fa-tasks" />
            <p>
              Tasks
            </p>
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/user/payments" className="nav-link">
          <i className="nav-icon fas fa-credit-card" />
            <p>
              Payments
            </p>
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/user/ratings" className="nav-link">
          <i className="nav-icon fas fa-star" />
            <p>
              Ratings
            </p>
          </Link>
        </li>

      
         
      </ul>
    </nav>
    {/* /.sidebar-menu */}
  </div>
  {/* /.sidebar */}
</aside>

      
    </div>
      
    </div>
  )
}

export default SideNavUser;