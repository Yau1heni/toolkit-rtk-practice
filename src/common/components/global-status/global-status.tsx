import { toast, ToastContainer } from "react-toastify";
import { useEffect } from "react";
import { appActions } from "app/store/app-slice";
import { useActions, useAppSelector } from "common/hooks";

export const GlobalStatus = () => {
  const error = useAppSelector((state) => state.app.error);
  const { setError } = useActions(appActions);

  if (error !== null) {
    toast.error(error);
  }

  useEffect(() => {
    if (error !== null) {
      setTimeout(() => {
        setError({ error: null });
      }, 1000);
    }
  }, [error]);

  return (
    <ToastContainer
      position="bottom-left"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="colored"
    />
  );
};
