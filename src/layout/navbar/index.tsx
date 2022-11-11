const Navbar = () => {
  const x = "";
  return (
    <nav className="navbar sticky-top bg-dark align-items-center justify-content-between">
      <span className="col-md-3 col-lg-2 mr-0 px-3">Arvan Challenge</span>
      <ul className="navbar-nav px-3">
        <li className="nav-item text-nowrap">
          <button className="nav-link">Logout</button>
        </li>
      </ul>
    </nav>
  );
};
export default Navbar;
