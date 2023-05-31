import { createBrowserRouter } from "react-router-dom";
import { Register } from "features/auth/register/register";
import { Login } from "features/auth/login/login";
import { Profile } from "features/profile/profile";
import { ErrorPage } from "common/components/error-page/error-page";
import { routesPath } from "common/constans/routes-path";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <div>Start</div>,
    errorElement: <ErrorPage />,
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
