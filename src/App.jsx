import { Route, Routes } from "react-router-dom";
import Login from "./pages/public/login/Login";
import PrivateRoutes from "./routes/PrivateRoutes";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/app/*" element={<PrivateRoutes />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
