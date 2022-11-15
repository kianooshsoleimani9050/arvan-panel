import { AuthPagePropsType } from "../@types/auth/AuthPage.model";

const AuthPage = ({ title, children }: AuthPagePropsType) => (
  <div className="p-3 m-0 d-flex flex-column align-items-center justify-content-center">
    <h1 className="my-3 text-secondary">{title}</h1>
    <div className="p-0 m-0 w-100">{children}</div>
  </div>
);
export default AuthPage;
