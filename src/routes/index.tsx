import { Suspense, ElementType } from "react";
import { Navigate, useRoutes } from "react-router-dom";
// components
import { PATH, PATH_AUTH } from "./paths";
// utils
import { lazyRetryHandler } from "../utils/common";
import LayoutContainer from "../layout/dashboard";
import AuthGuard from "../guards/AuthGuard";
import GuestGuard from "../guards/GuestGuard";
import AuthLayoutContainer from "../layout/auth";

// ----------------------------------------------------------------------

const Loadable = (Component: ElementType) => (props: any) =>
  (
    <Suspense fallback={"loading"}>
      <Component {...props} />
    </Suspense>
  );

export default function Router() {
  return useRoutes([
    {
      path: PATH_AUTH.BASE,
      element: (
        <GuestGuard>
          <AuthLayoutContainer />
        </GuestGuard>
      ),
      children: [
        {
          index: true,
          element: <Navigate to={PATH_AUTH.LOGIN} replace />,
        },
        {
          path: PATH_AUTH.LOGIN,
          element: <Login />,
        },
        {
          path: PATH_AUTH.REGISTER,
          element: <Register />,
        },
      ],
    },
    {
      path: PATH.BASE,
      element: (
        <AuthGuard>
          <LayoutContainer />
        </AuthGuard>
      ),
      children: [
        {
          index: true,
          element: <Navigate to={PATH.ARTICLE.BASE} replace />,
        },
        {
          path: PATH.ARTICLE.BASE,
          children: [
            {
              index: true,
              element: <Articles />,
            },
            {
              path: PATH.ARTICLE.PAGE,
              element: <Articles />,
            },
            {
              path: PATH.ARTICLE.ADD,
              element: <NewArticle />,
            },
            {
              path: PATH.ARTICLE.EDIT,
              element: <EditArticle />,
            },
          ],
        },
      ],
    },

    // Main Routes
    { path: "500", element: "500" },
    { path: "404", element: "404" },
    { path: "403", element: "403" },
    { path: "*", element: <Navigate to="/404" replace /> },
  ]);
}

// Auth
const Login = Loadable(lazyRetryHandler(() => import("../pages/auth/Login")));
const Register = Loadable(
  lazyRetryHandler(() => import("../pages/auth/Register")),
);

// Dashboard
const Articles = Loadable(
  lazyRetryHandler(() => import("../pages/dashboard/Articles")),
);
const NewArticle = Loadable(
  lazyRetryHandler(() => import("../pages/dashboard/NewArticle")),
);
const EditArticle = Loadable(
  lazyRetryHandler(() => import("../pages/dashboard/EditArticle")),
);
