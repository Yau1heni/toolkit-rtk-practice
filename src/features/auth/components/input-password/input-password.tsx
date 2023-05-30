import React, {
  ChangeEvent,
  DetailedHTMLProps,
  forwardRef,
  InputHTMLAttributes,
  KeyboardEvent,
  useState,
} from "react";
import s from "./input-password.module.css";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";

type DefaultInputPasswordPropsType = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

type InputPasswordPropsType = DefaultInputPasswordPropsType & {
  fieldName?: string;
  onChangePassword?: (value: string) => void;
  onEnter?: () => void;
  error?: string;
  spanClassName?: string;
};

type Ref = HTMLInputElement;

export const InputPassword = forwardRef<Ref, InputPasswordPropsType>(
  (
    {
      type,
      fieldName,
      onChange,
      onChangePassword,
      onKeyDown,
      onEnter,
      error,
      className,
      spanClassName,
      ...restProps
    },
    ref
  ) => {
    InputPassword.displayName = "InputText";

    const [showPass, setShowPass] = useState(false);

    const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
      onChange && onChange(e);
      onChangePassword && onChangePassword(e.currentTarget.value);
    };
    const onKeyPressCallback = (e: KeyboardEvent<HTMLInputElement>) => {
      onKeyDown && onKeyDown(e);
      onEnter && e.key === "Enter" && onEnter();
    };

    const finalSpanClassName = `${s.error} ${spanClassName ? spanClassName : ""}`;
    const finalInputClassName = `${s.inputPassword} ${error && s.errorInput} ${className}`;

    return (
      <>
        <label className={`${s.inputContainer} ${finalInputClassName}`}>
          {fieldName && <span className={s.fieldName}>{fieldName}</span>}
          <input
            ref={ref}
            type={showPass ? "text" : "password"}
            onChange={onChangeCallback}
            onKeyDown={onKeyPressCallback}
            {...restProps}
          />
          <span className={s.icon} onClick={() => setShowPass(!showPass)}>
            {showPass ? <Visibility /> : <VisibilityOff />}
          </span>
          {error && <span className={finalSpanClassName}>{error}</span>}
        </label>
      </>
    );
  }
);
