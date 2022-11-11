const Sidebar = () => (
  <nav className="fixed-top col-md-3 col-lg-2 d-md-block bg-light">
    <div className="sidebar-sticky pt-3">
      <ul className="nav flex-column">
        <li className="nav-item">
          <a className="nav-link active" href="#">
            <span data-feather="home" />
            Dashboard <span className="sr-only">(current)</span>
          </a>
        </li>
      </ul>
    </div>
  </nav>
);
export default Sidebar;
