import { useAppDispatch } from "app/hooks/store-hooks";
import s from "./register.module.css";
import { authThunks } from "features/auth/auth-slice";
import { RegisterPayloadType } from "features/auth/auth-api";

export const Register = () => {
  const dispatch = useAppDispatch();

  const registerHandler = () => {
    dispatch(
      authThunks.register({
        email: process.env.REACT_APP_LOGIN,
        password: process.env.REACT_APP_PASSWORD,
      } as RegisterPayloadType)
    );
  };

  return (
    <div className={s.container}>
      <h1>Register</h1>
      <button onClick={registerHandler}>register</button>
    </div>
  );
};
