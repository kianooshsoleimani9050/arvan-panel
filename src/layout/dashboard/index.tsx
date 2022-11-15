import { Outlet } from "react-router-dom";
import Navbar from "./navbar";
import Sidebar from "./sidebar";

const LayoutContainer = () => (
  <>
    <Navbar />
    <Sidebar>
      <Outlet />
    </Sidebar>
  </>
);
export default LayoutContainer;
