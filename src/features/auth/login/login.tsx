import s from "./login.module.css";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "features/auth/utils/shemes";
import { SubmitHandler, useForm } from "react-hook-form";
import { Form } from "common/components/form/form";
import { routes } from "common/constans/routes";
import { Link } from "react-router-dom";
import { authThunks } from "features/auth/auth-slice";
import { useState } from "react";
import { Button, Checkbox, PasswordInput, TextInput } from "@mantine/core";
import { useAppDispatch } from "common/hooks";

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
      <TextInput
        {...register("email")}
        placeholder="Your email"
        label="Your email"
        autoComplete="off"
        error={errors.email?.message ? errors.email.message : ""}
      />
      <div>
        <PasswordInput
          {...register("password")}
          placeholder="Password"
          label="Password"
          error={errors.password?.message ? errors.password.message : ""}
        />
        <div className={s.checkboxContainer}>
          <Checkbox
            size={"md"}
            style={{ paddingTop: "20px" }}
            checked={checked}
            onChange={handleChangeCheckbox}
            label="Remember me"
          />
          <Link to={routes.FORGOT_PASSWORD} className={s.link}>
            Forgot password?
          </Link>
        </div>
      </div>
      <Button type="submit" variant={"filled"} disabled={!isValid && !isDirty}>
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
