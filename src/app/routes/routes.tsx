import { routesPath } from "common/constans/routes-path";
import { Navigate, Route, Routes } from "react-router-dom";
import { Login } from "features/auth/login/login";
import { Register } from "features/auth/register/register";
import { PrivateRoutes } from "app/routes/private-routes";
import { Profile } from "features/profile/profile";
import { ErrorPage } from "common/components/error-page/error-page";
import { Packs } from "features/packs/components/packs/packs";
import { Cards } from "features/cards/components/cards/cards";

export const Pages = () => {
  return (
    <Routes>
      <Route path={routesPath.LOGIN} element={<Login />} />
      <Route path={routesPath.REGISTER} element={<Register />} />

      <Route element={<PrivateRoutes />}>
        <Route path={"/"} element={<Navigate to={routesPath.PACKS} />} />
        <Route path={routesPath.PACKS} element={<Packs />} />
        <Route path={routesPath.CARDS} element={<Cards />} />
        <Route path={routesPath.PROFILE} element={<Profile />} />
        <Route path={routesPath.NOT_FOUND} element={<ErrorPage />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Route>
    </Routes>
  );
};
