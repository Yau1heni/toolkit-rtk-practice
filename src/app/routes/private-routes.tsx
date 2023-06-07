import { Navigate, Outlet } from "react-router-dom";
import { routesPath } from "common/constans/routes-path";
import { useAppSelector } from "common/hooks";
import { isInitializedAppSelector } from "app/selectors/app-selectors";

export const PrivateRoutes = () => {
  const isInitialized = useAppSelector(isInitializedAppSelector);

  return isInitialized ? <Outlet /> : <Navigate to={routesPath.LOGIN} />;
};
