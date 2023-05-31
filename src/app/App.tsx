import { useAppSelector } from "app/hooks/store-hooks";
import { Progress } from "@mantine/core";

function App() {
  const isLoading = useAppSelector((state) => state.app.isLoading);

  return <div className="App"> {isLoading && <Progress animate value={100} />} </div>;
}

export default App;
