import { useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthGuardPropsType } from "../@types/guard/AuthGuard.model";
import useAuth from "../hooks/useAuth";
import { AUTH_ABSOLUTE_PATH } from "../routes/paths";

export default function AuthGuard({ children }: AuthGuardPropsType) {
  const { isAuthenticated, isInitialized } = useAuth();
  const { pathname } = useLocation();

  const [requestedLocation, setRequestedLocation] = useState<string | null>(
    null,
  );

  if (!isInitialized) {
    return <>loading</>;
  }

  if (!isAuthenticated) {
    if (pathname !== requestedLocation) {
      setRequestedLocation(pathname);
    }
    return <Navigate to={AUTH_ABSOLUTE_PATH.LOGIN} />;
  }

  if (requestedLocation && pathname !== requestedLocation) {
    setRequestedLocation(null);
    return <Navigate to={requestedLocation} />;
  }

  return <>{children}</>;
}
