import { useAppDispatch } from "app/hooks/store-hooks";
import s from "./login.module.css";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "features/auth/utils/shemes";
import { SubmitHandler, useForm } from "react-hook-form";
import { Form } from "common/components/form/form";
import { InputText } from "features/auth/components/input-text/input-text";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import { routes } from "common/constans/routes";
import { Link } from "react-router-dom";
import { InputPassword } from "features/auth/components/input-password/input-password";
import { authThunks } from "features/auth/auth-slice";
import { FormControlLabel } from "@mui/material";
import { useState } from "react";

type FormData = {
  email: string;
  password: string;
};

export const Login = () => {
  const dispatch = useAppDispatch();
  const [checked, setChecked] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors, isDirty, isValid },
  } = useForm<FormData>({ mode: "onTouched", resolver: yupResolver(loginSchema) });

  const onFormSubmit: SubmitHandler<FormData> = ({ email, password }) => {
    dispatch(authThunks.login({ email, password, rememberMe: checked }));
  };

  const handleChangeCheckbox = () => {
    setChecked(!checked);
  };

  return (
    <Form title={"Sign in"} onSubmit={handleSubmit(onFormSubmit)}>
      <InputText
        fieldName="Email"
        {...register("email")}
        autoComplete="off"
        error={errors.email?.message ? errors.email.message : ""}
      />
      <div>
        <InputPassword
          fieldName="Password"
          {...register("password")}
          autoComplete="off"
          error={errors.password?.message ? errors.password.message : ""}
        />
        <FormControlLabel
          control={<Checkbox checked={checked} onChange={handleChangeCheckbox} />}
          label="Remember me"
        />
        <div className={s.linkForgotContainer}>
          <Link to={routes.FORGOT_PASSWORD} className={s.link}>
            Forgot password?
          </Link>
        </div>
      </div>
      <Button type="submit" variant={"contained"} disabled={!isValid && !isDirty}>
        Sign in
      </Button>
      <div className={s.linkContainer}>
        <p>Don't have an account??</p>
        <Link to={routes.REGISTER} className={s.link}>
          Registration
        </Link>
      </div>
    </Form>
  );
};
