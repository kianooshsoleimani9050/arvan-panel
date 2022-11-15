import { BrowserRouter } from "react-router-dom";
import { CustomToastContainer } from "./components/CustomeToastContainer";
import AuthContextProvider from "./contexts/AuthContextProvider";
import CustomQueryClientProvider from "./contexts/CustomQueryClientProvider";
import Router from "./routes";

function App() {
  return (
    <>
      <CustomToastContainer />
      <AuthContextProvider>
        <CustomQueryClientProvider>
          <BrowserRouter>
            <Router />
          </BrowserRouter>
        </CustomQueryClientProvider>
      </AuthContextProvider>
    </>
  );
}

export default App;
