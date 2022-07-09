import { QueryClientProvider, QueryClient } from "react-query";
import "./app.css";
import Body from "./components/Body/Body";

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <div className="app">
        <Body />
      </div>
    </QueryClientProvider>
  );
}

export default App;
