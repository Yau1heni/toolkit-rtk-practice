import { useAppSelector } from "app/hooks/store-hooks";
import CircularProgress from "@mui/material/CircularProgress";

function App() {
  const isLoading = useAppSelector((state) => state.app.isLoading);

  return <div className="App">{isLoading && <CircularProgress />}</div>;
}

export default App;
