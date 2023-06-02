import { createBrowserRouter, Navigate } from "react-router-dom";
import { Register } from "features/auth/register/register";
import { Login } from "features/auth/login/login";
import { Profile } from "features/profile/profile";
import { ErrorPage } from "common/components/error-page/error-page";
import { routesPath } from "common/constans/routes-path";
import { Packs } from "features/packs/packs";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to={routesPath.PACKS} />,
    errorElement: <ErrorPage />,
  },
  {
    path: routesPath.PACKS,
    element: <Packs />,
  },
  {
    path: routesPath.REGISTER,
    element: <Register />,
  },
  {
    path: routesPath.LOGIN,
    element: <Login />,
  },
  {
    path: routesPath.PROFILE,
    element: <Profile />,
  },
]);
