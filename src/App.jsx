import { Route, Routes } from "react-router-dom";
import "./Global.css";
import Login from "./pages/public/login/Login";
import { RegisterEmployee } from "./pages/private/employees/registerEmployee/RegisterEmployee";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/cadastrar-funcionario" element={<RegisterEmployee />} />
    </Routes>
  );
}

export default App;
