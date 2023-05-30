import { BaseSyntheticEvent, PropsWithChildren } from "react";
import s from "./form.module.css";

export const Form = ({ title, children, onSubmit }: PropsWithChildren<FormPropsType>) => {
  return (
    <div className={s.block}>
      <h2>{title}</h2>
      <div className={s.content}>
        <form onSubmit={onSubmit}>{children}</form>
      </div>
    </div>
  );
};

type FormPropsType = {
  title: string;
  onSubmit: (e?: BaseSyntheticEvent) => Promise<void>;
};
