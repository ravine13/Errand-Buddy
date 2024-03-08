import { Link, useParams } from "react-router-dom";
const SideNavAdmin = () => {
  const { hrId } = useParams();
  return (
    <div>
      {/* Main Sidebar Container */}
      <aside className="main-sidebar sidebar-dark-primary elevation-4">
        {/* Brand Logo */}
        <a href="index3.html" className="brand-link">
          <span
            className="brand-text font-weight-light"
            style={{ marginLeft: "70px" }}
          >
            EB
          </span>
        </a>
        {/* Sidebar */}
        <div className="sidebar">
          {/* Sidebar user panel (optional) */}
          <div className="user-panel mt-3 pb-3 mb-3 d-flex">
            <div className="image"></div>
          </div>
          {/* SidebarSearch Form */}

          {/* Sidebar Menu */}
          <nav className="mt-2">
            <ul
              className="nav nav-pills nav-sidebar flex-column"
              data-widget="treeview"
              role="menu"
              data-accordion="false"
            >
              <li className="nav-item">
                <Link to="/admin/hr_profile" className="nav-link">
                  <i className="nav-icon fas fa-user-circle" />
                  <p>Profile</p>
                </Link>
              </li>

              <li className="nav-item">
                <a href="#" className="nav-link">
                  <i className="nav-icon fas fa-users-cog" />
                  <p>
                    <Link to={"/admin/view_managers"}>Errand Boys</Link>
                  </p>
                </a>
              </li>

            </ul>
          </nav>
          {/* /.sidebar-menu */}
        </div>
        {/* /.sidebar */}
      </aside>
    </div>
  );
};

export default SideNavAdmin;
