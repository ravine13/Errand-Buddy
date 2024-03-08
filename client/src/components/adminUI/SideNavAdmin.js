import { Link, useParams } from "react-router-dom";

const SideNavAdmin = () => {
  const { hrId } = useParams();
  return (
    <div>
      <aside className="main-sidebar sidebar-dark-primary elevation-4">
        <Link to="index3.html" className="brand-link">
          <span
            className="brand-text font-weight-light"
            style={{ marginLeft: "70px" }}
          >
            HRS
          </span>
        </Link>
        <div className="sidebar">
          <div className="user-panel mt-3 pb-3 mb-3 d-flex">
            <div className="image"></div>
          </div>
          <nav className="mt-2">
            <ul
              className="nav nav-pills nav-sidebar flex-column"
              data-widget="treeview"
              role="menu"
              data-accordion="false"
            >
              <li className="nav-item">
                <Link to="/hr/hr_profile" className="nav-link">
                  <i className="nav-icon fas fa-user-circle" />
                  <p>Profile</p>
                </Link>
              </li>

              <li className="nav-item">
                <Link to="#" className="nav-link">
                  <i className="nav-icon fas fa-users" />
                  <p>Employees</p>
                </Link>

                <Link to={"/hr/add_employee"} className="nav-link">
                  <i className="nav-icon fas fa-user-plus" />
                  <p>Onboard Employee</p>
                </Link>
              </li>

              <li className="nav-item">
                <Link to="#" className="nav-link">
                  <i className="nav-icon fas fa-users-cog" />
                  <p>Managers</p>
                </Link>
              </li>

              <li className="nav-item">
                <Link to="#" className="nav-link">
                  <i className="nav-icon fas fa-folder-open" />
                  <p>Documents</p>
                </Link>
              </li>

              <li className="nav-item">
                <Link to="#" className="nav-link">
                  <i className="nav-icon fas fa-book" />
                  <p>Education</p>
                </Link>
              </li>

              <li className="nav-item">
                <Link to="/hr/view_employee_payslip" className="nav-link">
                  <i className="nav-icon fas fa-money-check-alt" />
                  <p>Payroll</p>
                </Link>
              </li>

              <li className="nav-item">
                <Link to="/hr/view_leaves" className="nav-link">
                  <i className="nav-icon fas fa-hourglass-half" />
                  <p>Leave Tracker</p>
                </Link>
              </li>

              <li className="nav-item">
                <Link to="/hr/hr_pending_leaves" className="nav-link">
                  <i className="nav-icon fas fa-hourglass-half" />
                  <p>Approve Leaves</p>
                </Link>
              </li>

              <li className="nav-item">
                <Link to="#" className="nav-link">
                  <i className="nav-icon fas fa-chalkboard-teacher" />
                  <p>Training Tracker</p>
                </Link>
              </li>

              <li className="nav-item">
                <Link to="/hr/session" className="nav-link">
                  <i className="nav-icon fas fa-users-cog" />
                  <p>session</p>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </aside>
    </div>
  );
};

export default SideNavAdmin;
