import { SidebarPropsType } from "../../../@types/layout/dashboard/Sidebar.model";
import DesktopMenu from "../menu/DesktopMenu";

const Sidebar = ({ children }: SidebarPropsType) => (
  <div className="sidebar-container d-flex">
    <DesktopMenu />
    <div className="sidebar-content-container">{children}</div>
  </div>
);
export default Sidebar;
