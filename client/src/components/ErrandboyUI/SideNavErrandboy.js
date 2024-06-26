import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { retrieve } from "../Encryption";
import History from "./History";
import Notification from "./Notification";
import TaskList from "./Task";
import Messages from "./message";

const SideNavErrandboy = () => {
  const [showHistory, setShowHistory] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [showTask, setShowTask] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const retrievedErrandBoy = retrieve().errandBoy;
  const errandBoyId = retrievedErrandBoy ? retrievedErrandBoy.id : null;

  const resetAll = () => {
    setShowHistory(false);
    setShowNotification(false);
    setShowTask(false);
    setShowMessage(false);
  };
  
  const handleHistoryClick = () => {
    resetAll();
    setShowHistory(true);
  };
  
  const handleNotificationClick = () => {
    resetAll();
    setShowNotification(true);
  };
  
  const handleTaskClick = () => {
    resetAll();
    setShowTask(true);
  };

  const handleMessageClick = () => {
    resetAll();
    setShowMessage(true);
  }

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

                <li className="nav-item">
                  <Link to="/errandboy/history" onClick={handleHistoryClick} className="nav-link">
                    <i className="nav-icon fas fa-history" />
                    <p>
                      History
                    </p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/errandboy/notifications" onClick={handleNotificationClick} className="nav-link">
                    <i className="nav-icon fas fa-bell" />
                    <p>
                      Notification
                    </p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/errandboy/message" onClick={handleMessageClick} className="nav-link">
                    <i className="nav-icon fas fa-comments" />
                    <p>
                      Message
                    </p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/errandboy/task" onClick={handleTaskClick} className="nav-link"> 
                    <i className="nav-icon fas fa-tasks" />
                    <p>
                      Tasks
                    </p>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </aside>
        {showHistory && <History />}
        {showNotification && <Notification />}
        {showTask && <TaskList />}
        {showMessage && <Messages />}
      </div>
    </div>
  );
};

export default SideNavErrandboy;
