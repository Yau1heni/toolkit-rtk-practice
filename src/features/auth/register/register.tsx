import { SubmitHandler, useForm } from "react-hook-form";
import { useAppDispatch } from "app/hooks/store-hooks";
import { InputPassword } from "features/auth/components/input-password/input-password";
import { InputText } from "features/auth/components/input-text/input-text";
import { Button } from "@mui/material";
import { Form } from "common/components/form/form";
import { registrationSchema } from "features/auth/utils/shemes";
import { yupResolver } from "@hookform/resolvers/yup";
import { authThunks } from "features/auth/auth-slice";
import { Link } from "react-router-dom";
import s from "./register.module.css";
import { routes } from "common/consts/routes";

type FormData = {
  email: string;
  password: string;
  confirmPassword: string;
};

export const Register = () => {
  const dispatch = useAppDispatch();

  const {
    handleSubmit,
    register,
    formState: { errors, isDirty, isValid },
  } = useForm<FormData>({ mode: "onTouched", resolver: yupResolver(registrationSchema) });

  console.log(errors);

  const onFormSubmit: SubmitHandler<FormData> = (data) => {
    const { email, password } = data;
    dispatch(authThunks.register({ email, password }));
  };

  return (
    <Form title={"Registration"} onSubmit={handleSubmit(onFormSubmit)}>
      <InputText
        fieldName="Email"
        {...register("email")}
        autoComplete="off"
        error={errors.email?.message ? errors.email.message : ""}
      />

      <InputPassword
        fieldName="Password"
        {...register("password")}
        autoComplete="off"
        error={errors.password?.message ? errors.password.message : ""}
      />
      <InputPassword
        fieldName="Confirm password"
        {...register("confirmPassword")}
        autoComplete="off"
        error={errors.confirmPassword?.message ? errors.confirmPassword.message : ""}
      />
      <Button type="submit" variant={"contained"} disabled={!isValid && !isDirty}>
        Sign in
      </Button>
      <div className={s.linkContainer}>
        <p>Already have an account?</p>
        <Link to={routes.LOGIN} className={s.link}>
          Login
        </Link>
      </div>
    </Form>
  );
};
