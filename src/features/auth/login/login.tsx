import s from "./login.module.css";
import { Form } from "common/components/form/form";
import { routesPath } from "common/constans/routes-path";
import { Link } from "react-router-dom";
import { Button, Checkbox, PasswordInput, TextInput } from "@mantine/core";
import { useLoginForm } from "features/auth/hooks/useLoginForm";

export const Login = () => {
  const {
    handleSubmit,
    onFormSubmit,
    handleChangeCheckbox,
    checked,
    register,
    errors,
    isDirty,
    isValid,
  } = useLoginForm();

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
          <Link to={routesPath.FORGOT_PASSWORD} className={s.link}>
            Forgot password?
          </Link>
        </div>
      </div>
      <Button type="submit" variant={"filled"} disabled={!isValid && !isDirty}>
        Sign in
      </Button>
      <div className={s.linkContainer}>
        <p>Don't have an account??</p>
        <Link to={routesPath.REGISTER} className={s.link}>
          Registration
        </Link>
      </div>
    </Form>
  );
};
