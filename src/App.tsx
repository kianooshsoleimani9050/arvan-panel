import { BrowserRouter } from "react-router-dom";
import CustomQueryClientProvider from "./contexts/CustomQueryClientProvider";
import Router from "./routes";

function App() {
  return (
    <CustomQueryClientProvider>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </CustomQueryClientProvider>
  );
}

export default App;
