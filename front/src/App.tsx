import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Protected from "./components/Protected";
import Home from "./pages/home/Home";
import ResetPassword from "./pages/ResetPassword";
import { Toaster } from "react-hot-toast";

function App() {
  console.log("app running ...");

  return (
    <div className="flex w-screen h-screen">
      <Toaster />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/*" element={<Protected> <Home /> </Protected>} />
        {/* <Route
          path="/:tab"
          element={<Protected> <Home /> </Protected>}
        /> */}
        <Route path="/reset_password" element={<ResetPassword />} />
      </Routes>
    </div>
  );
}

export default App;
