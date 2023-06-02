import { useAppDispatch } from "common/hooks";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "features/auth/utils/shemes";
import { authThunks } from "features/auth/auth-slice";
import { toast } from "react-toastify";
import { routesPath } from "common/constans/routes-path";

type FormData = {
  email: string;
  password: string;
};

export const useLoginForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [checked, setChecked] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors, isDirty, isValid },
  } = useForm<FormData>({ mode: "onTouched", resolver: yupResolver(loginSchema) });

  const onFormSubmit: SubmitHandler<FormData> = ({ email, password }) => {
    dispatch(authThunks.login({ email, password, rememberMe: checked }))
      .unwrap()
      .then(() => {
        toast.success("you have successfully logged on");
        navigate(routesPath.PACKS);
      })
      .catch((err) => {
        toast.error(err.e.response.data.error);
      });
  };

  const handleChangeCheckbox = () => {
    setChecked(!checked);
  };

  return {
    handleSubmit,
    register,
    errors,
    isDirty,
    isValid,
    onFormSubmit,
    handleChangeCheckbox,
    checked,
  };
};
