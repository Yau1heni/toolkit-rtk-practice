import { useAppSelector } from "app/hooks/store-hooks";
import { Loader } from "@mantine/core";

function App() {
  const isLoading = useAppSelector((state) => state.app.isLoading);

  return <div className="App">{isLoading && <Loader />}</div>;
}

export default App;
