import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ToastAnimated, {
  showToast,
} from "../../../../components/ui-lib/Toast.jsx";
import "./EmployeeList.css";
import {
  findAllEmployees,
  deleteEmployee,
} from "../../../../services/employeesService.jsx";
import { EmployeeItem } from "./EmployeeItem.jsx";

export default function EmployeeList() {
  const { state } = useLocation();
  const [employees, setEmployees] = useState([]);
  const [searchEmployeeName, SetSearchEmployeeName] = useState("");

  useEffect(() => {
    getAllEmployees();
  }, [searchEmployeeName]);

  useEffect(() => {
    if (state) showToast({ type: "success", message: state });
  }, []);

  const getAllEmployees = async () => {
    try {
      const response = await findAllEmployees(searchEmployeeName);
      if (response) setEmployees(response);
    } catch (error) {
      showToast({ type: "error", message: error.response.data.message });
    }
  };

  const removeEmployee = async (id) => {
    const { name } = employees.find((e) => e.id === id);
    const answer = window.confirm(
      `Tem certeza que deseja excluir o funcionário: ${name}?`
    );

    if (answer) {
      try {
        await deleteEmployee(id);
        showToast({
          type: "success",
          message: `Funcionário < ${name} > excluído com sucesso!`,
        });
        getAllEmployees();
      } catch (error) {
        showToast({
          type: "error",
          message: `${error.response.data.message}`,
        });
      }
    }
  };
  return (
    <>
      <ToastAnimated />
      <h1>Situação dos funcionários</h1>

      <div className="search-wrapper">
        <input
          type="text"
          name="searchEmployeeName"
          value={searchEmployeeName}
          onChange={(e) => SetSearchEmployeeName(e.target.value)}
          placeholder="Buscar funcionário"
        />
        <span className="material-symbols-outlined searchEmployeeNameIcon">person_search</span>
      </div>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th scope="col">Nome</th>
              <th scope="col">Admissão</th>
              <th scope="col">Vencimento</th>
              <th scope="col">Dias vencidos</th>
              <th scope="col">Situação</th>
              <th scope="col" style={{ textAlign: "center" }}>
                Ações
              </th>
            </tr>
          </thead>
          <tbody>
            {employees.length > 0 ? (
              employees.map((employee) => (
                <EmployeeItem
                  employee={employee}
                  key={employee.id}
                  handleDelete={() => removeEmployee(employee.id)}
                />
              ))
            ) : (
              <tr scope="row">
                <td colSpan="6">Nenhum funcionário cadastrado!</td>
              </tr>
            )}
          </tbody>
          <tfoot>
            <tr>
              <td scope="col">Nome</td>
              <td scope="col">Admissão</td>
              <td scope="col">Vencimento</td>
              <td scope="col">Dias vencidos</td>
              <td scope="col">Situação</td>
              <td scope="col" style={{ textAlign: "center" }}>
                Ações
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </>
  );
}
