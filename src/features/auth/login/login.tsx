import { useAppDispatch } from "app/hooks/store-hooks";
import s from "./login.module.css";
import { authThunks } from "features/auth/auth-slice";
import { LoginPayloadType } from "features/auth/auth-api";

export const Login = () => {
  const dispatch = useAppDispatch();

  const loginHandler = () => {
    dispatch(
      authThunks.login({
        email: process.env.REACT_APP_LOGIN,
        password: process.env.REACT_APP_PASSWORD,
        rememberMe: false,
      } as LoginPayloadType)
    );
  };

  return (
    <div className={s.container}>
      <h1>login</h1>
      <button onClick={loginHandler}>login</button>
    </div>
  );
};
