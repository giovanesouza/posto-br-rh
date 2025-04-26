import { Routes, Route } from "react-router-dom";
import { Header } from "../components/header/Header";
import RegisterEmployee from "../pages/private/employees/registerEmployee/RegisterEmployee";
import EmployeeList from "../pages/private/employees/list/EmplyeeList";
import { NotFound } from "../pages/public/notFound/NotFound";
import { ProtectedRoute } from "./ProctedRoute";
import EditEmployee from "../pages/private/employees/editEmployee/EditEmployee";
import RegisterVacation from "../pages/private/employees/Vacation/RegisterVacation";
import ListEmployeeVacations from "../pages/private/employees/Vacation/ListEmployeeVacations";
import EditVacation from "../pages/private/employees/Vacation/EditVacation";
import { Footer } from "../components/footer/Footer";
import Settings from "../pages/private/settings/Settings";


const PrivateRoutes = () => (
  <>
      <Header />
      <main>
        <Routes>
          <Route path="/funcionarios" element={<ProtectedRoute><EmployeeList /></ProtectedRoute>} />
          <Route path="/cadastrar-funcionario" element={<ProtectedRoute><RegisterEmployee /></ProtectedRoute>} />
          <Route path="/editar-funcionario/:id" element={<ProtectedRoute><EditEmployee /></ProtectedRoute>} />
          <Route path="/historico-de-ferias/funcionario/:id" element={<ProtectedRoute><ListEmployeeVacations /></ProtectedRoute>} />
          <Route path="/cadastrar-ferias/funcionario/:id" element={<ProtectedRoute><RegisterVacation /></ProtectedRoute>} />
          <Route path="/editar-ferias/:id" element={<ProtectedRoute><EditVacation /></ProtectedRoute>} />
          <Route path="/settings/atualizar-login/user/:id" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
  </>
);

export default PrivateRoutes;
