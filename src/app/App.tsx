import { Progress } from "@mantine/core";
import { useAppSelector } from "common/hooks";

function App() {
  const isLoading = useAppSelector((state) => state.app.isLoading);

  return <div className="App"> {isLoading && <Progress animate value={100} />} </div>;
}

export default App;
