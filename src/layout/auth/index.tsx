import { Outlet } from "react-router-dom";

const AuthLayoutContainer = () => (
  <div className="auth-container d-flex align-items-center justify-content-center">
    <div className="auth-form bg-light">
      <Outlet />
    </div>
  </div>
);
export default AuthLayoutContainer;
