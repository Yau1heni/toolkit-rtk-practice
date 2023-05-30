import { SubmitHandler, useForm } from "react-hook-form";
import { useAppDispatch } from "app/hooks/store-hooks";
import { Form } from "common/components/form/form";
import { registrationSchema } from "features/auth/utils/shemes";
import { yupResolver } from "@hookform/resolvers/yup";
import { authThunks } from "features/auth/auth-slice";
import { Link } from "react-router-dom";
import s from "./register.module.css";
import { routes } from "common/constans/routes";
import { Button, PasswordInput, TextInput } from "@mantine/core";

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

  const onFormSubmit: SubmitHandler<FormData> = (data) => {
    const { email, password } = data;
    dispatch(authThunks.register({ email, password }));
  };

  return (
    <Form title={"Registration"} onSubmit={handleSubmit(onFormSubmit)}>
      <TextInput
        {...register("email")}
        placeholder="Your email"
        label="Your email"
        autoComplete="off"
        error={errors.email?.message ? errors.email.message : ""}
      />

      <PasswordInput
        {...register("password")}
        placeholder="Password"
        label="Password"
        error={errors.password?.message ? errors.password.message : ""}
      />
      <PasswordInput
        {...register("confirmPassword")}
        placeholder="Confirm password"
        label="Confirm password"
        error={errors.confirmPassword?.message ? errors.confirmPassword.message : ""}
      />
      <Button type="submit" variant={"filled"} disabled={!isValid && !isDirty}>
        Sign in
      </Button>
      <div className={s.linkContainer}>
        <p>Already have an account?</p>
        <Link to={routes.LOGIN} className={s.link}>
          Sign in
        </Link>
      </div>
    </Form>
  );
};
