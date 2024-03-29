import * as yup from "yup";

const emailRegExp = /^\w[\w-.]*@[\w-]+\.[a-z]{2,7}$/i;

export const loginSchema = yup.object().shape({
  email: yup.string().matches(emailRegExp, "Email must be a valid").required(),
  password: yup.string().min(8).max(20).required(),
});

export const registrationSchema = yup.object().shape({
  email: yup.string().matches(emailRegExp, "Email must be a valid").required(),
  password: yup.string().min(8).max(20).required(),
  confirmPassword: yup
    .string()
    .min(8)
    .max(20)
    .oneOf([yup.ref("password")], "The password must match the new password")
    .required(),
});
