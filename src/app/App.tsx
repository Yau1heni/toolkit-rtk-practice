import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "app/hooks/store-hooks";
import CircularProgress from "@mui/material/CircularProgress";
import { appActions } from "app/store/app-slice";

function App() {
  const isLoading = useAppSelector((state) => state.app.isLoading);

  const dispatch = useAppDispatch();

  useEffect(() => {
    setTimeout(() => {
      dispatch(appActions.setIsLoading({ isLoading: false }));
    }, 3000);
  }, [dispatch]);

  return <div className="App">{isLoading && <CircularProgress />}</div>;
}

export default App;
