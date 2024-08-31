import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Dashboard from "./pages/Dashboard";
import SendMoney from "./pages/SendMoney";
import { Provider } from "react-redux";
import store from "./utils/store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PrivateRoute from "./components/PrivateRoute"; // Adjust the path as necessary

function App() {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <ToastContainer />
          <Routes>
            <Route path="/" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/send"
              element={
                <PrivateRoute>
                  <SendMoney />
                </PrivateRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
