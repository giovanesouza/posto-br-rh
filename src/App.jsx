import { Route, Routes } from "react-router-dom";
import "./Global.css";
import Login from "./pages/public/login/Login";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
    </Routes>
  );
}

export default App;
