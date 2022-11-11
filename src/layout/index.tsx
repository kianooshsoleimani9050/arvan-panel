import { Outlet } from "react-router-dom";
import Navbar from "./navbar";
import Sidebar from "./sidebar";

const LayoutContainer = () => {
  const x = "";
  return (
    <div className="h-100">
      <Navbar />
      <div className="container-fluid">
        <div className="row">
          <Sidebar />
          <div className="col-md-9 ml-sm-auto col-lg-10 px-md-4">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};
export default LayoutContainer;
