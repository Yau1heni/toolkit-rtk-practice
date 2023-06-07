import { Progress } from "@mantine/core";
import { useActions, useAppSelector } from "common/hooks";
import { useEffect } from "react";
import { appThunk } from "app/store/app-slice";
import { isLoadingAppSelector } from "app/selectors/app-selectors";
import { toast } from "react-toastify";
import { routesPath } from "common/constans/routes-path";
import { useNavigate } from "react-router-dom";
import { Pages } from "app/routes/routes";

function App() {
  const isLoading = useAppSelector(isLoadingAppSelector);

  const navigate = useNavigate();

  const { initialized } = useActions(appThunk);

  useEffect(() => {
    initialized()
      .unwrap()
      .then(() => {
        toast.success("welcome!");
        navigate(routesPath.PACKS);
      })
      .catch((err) => {
        toast.error(err.e.response.data.error);
      });
  }, []);

  return (
    <div className="App">
      {isLoading && <Progress animate value={100} />}
      <Pages />
    </div>
  );
}

export default App;
