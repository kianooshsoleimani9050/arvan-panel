import { Navigate } from "react-router-dom";
import { GuestGuardPropsType } from "../@types/guard/GuestGuard.model";
import useAuth from "../hooks/useAuth";
import { PATH } from "../routes/paths";

export default function GuestGuard({ children }: GuestGuardPropsType) {
  const { isAuthenticated, isInitialized } = useAuth();

  if (isAuthenticated) {
    return <Navigate to={PATH.BASE} />;
  }

  if (!isInitialized) {
    return <>loading</>;
  }

  return <>{children}</>;
}
