import { NavLink } from "react-router-dom";
import { ABSOLUTE_PATH } from "../../../routes/paths";

const DesktopMenu = () => (
  <div className="desktop-menu-container bg-primary d-none d-sm-block">
    <div className="p-0 m-0 row">
      <div className="p-3">
        <h4 className="text-white m-0">Post</h4>
      </div>
      <NavLink
        to={ABSOLUTE_PATH.ARTICLE.BASE}
        className={({ isActive }) =>
          isActive
            ? "desktop-menu-link-active text-decoration-none"
            : "desktop-menu-link text-decoration-none"
        }
      >
        <h6 className="text-white m-0 p-2 pl-4">All Articles</h6>
      </NavLink>
      <NavLink
        to={ABSOLUTE_PATH.ARTICLE.ADD}
        className={({ isActive }) =>
          isActive
            ? "desktop-menu-link-active text-decoration-none"
            : "desktop-menu-link text-decoration-none"
        }
        end
      >
        <h6 className="text-white m-0 p-2 pl-4">New Article</h6>
      </NavLink>
    </div>
  </div>
);
export default DesktopMenu;
