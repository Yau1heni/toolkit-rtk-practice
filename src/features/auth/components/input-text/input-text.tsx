import React, {
  ChangeEvent,
  DetailedHTMLProps,
  forwardRef,
  InputHTMLAttributes,
  KeyboardEvent,
} from "react";
import s from "./input-text.module.css";

// Пропсы стандартного инпута
type DefaultInputTextPropsType = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

type InputTextPropsType = DefaultInputTextPropsType & {
  fieldName?: string;
  onChangeText?: (value: string) => void;
  onEnter?: () => void;
  error?: string;
  spanClassName?: string;
};

type Ref = HTMLInputElement;

export const InputText = forwardRef<Ref, InputTextPropsType>(
  (
    {
      type,
      fieldName,
      onChange,
      onChangeText,
      onKeyDown,
      onEnter,
      error,
      className,
      spanClassName,
      ...restProps
    },
    ref
  ) => {
    InputText.displayName = "InputText";

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
      onChange && onChange(e);
      onChangeText && onChangeText(e.currentTarget.value);
    };

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
      onKeyDown && onKeyDown(e);
      onEnter && e.key === "Enter" && onEnter();
    };

    const finalSpanClassName = `${s.error} ${spanClassName ? spanClassName : ""}`;
    const finalInputClassName = `${s.inputText} ${error && s.errorInput} ${className}`;

    return (
      <>
        <label className={`${s.inputContainer} ${finalInputClassName}`}>
          {fieldName && <span className={s.fieldName}>{fieldName}</span>}
          <input
            ref={ref}
            type={"text"}
            onChange={onChangeHandler}
            onKeyDown={onKeyPressHandler}
            {...restProps}
          />
          {error && <span className={finalSpanClassName}>{error}</span>}
        </label>
      </>
    );
  }
);
