import { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../../../context/AuthContext.jsx";
import { findEmployeeById } from "../../../../services/employeesService.jsx";
import { deleteVacation } from "../../../../services/vacationService.jsx";
import ToastAnimated, {
  showToast,
} from "../../../../components/ui-lib/Toast.jsx";

export default function ListEmployeeVacations() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAdmin  } = useContext(AuthContext);
  const [employee, setEmployee] = useState({});

  useEffect(() => {
    getEmployeeById();
  }, []);

  const getEmployeeById = async () => {
    try {
      const response = await findEmployeeById(id);
      if (response) setEmployee(response);
    } catch (error) {
      showToast({ type: "error", message: error.response.data.message });
    }
  };

  const handleDelete = async (id) => {
    const answer = window.confirm(
      `Tem certeza que deseja excluir esta férias?`
    );
    if (answer) {
      try {
        await deleteVacation(id);
        showToast({
          type: "success",
          message: `Férias excluída com sucesso!`,
        });
        getEmployeeById();
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
      <h1 style={{ marginBottom: "3rem" }} className="text-align-center">
        Histórico de férias do(a) funcionário(a): <br /> {employee.name}
      </h1>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th scope="col">Funcionário</th>
              <th scope="col">Data inicial</th>
              <th scope="col">Data final</th>
              <th scope="col">Dias vendidos</th>
              {isAdmin && (
                <th scope="col">
                  <button
                    className="material-symbols-outlined bg-hover-blue color-blue"
                    title="Cadastrar férias para este funcionário"
                    onClick={() =>
                      navigate(`/app/cadastrar-ferias/funcionario/${id}`)
                    }
                  >
                    calendar_add_on
                  </button>
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {employee.vacations?.length > 0 ? (
              employee.vacations.map((vacation) => (
                <tr key={vacation.id}>
                  <td>{employee.name}</td>
                  <td>
                    <input
                      type="date"
                      value={vacation.startDate.slice(0, 10)}
                      disabled
                      readOnly={true}
                    />
                  </td>
                  <td>
                    <input
                      type="date"
                      value={vacation.endDate.slice(0, 10)}
                      disabled
                      readOnly={true}
                    />
                  </td>
                  <td>{vacation.soldDays}</td>

                  {isAdmin && (
                    <td>
                      <button
                        className="material-symbols-outlined bg-hover-green color-green"
                        onClick={() =>
                          navigate(`/app/editar-ferias/${vacation.id}`)
                        }
                        title="Editar férias"
                      >
                        edit
                      </button>
                      <button
                        className="material-symbols-outlined bg-hover-danger color-danger"
                        onClick={() => handleDelete(`${vacation.id}`)}
                        title="Excluir férias do histórico"
                      >
                        delete
                      </button>
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr scope="row">
                <td colSpan="5">Nenhuma férias cadastrada!</td>
              </tr>
            )}
          </tbody>
          <tfoot>
            <tr>
              <td scope="col">Funcionário</td>
              <td scope="col">Data inicial</td>
              <td scope="col">Data final</td>
              <td scope="col">Dias vendidos</td>
              {isAdmin && (
                <td scope="col">
                  <button
                    className="material-symbols-outlined bg-hover-blue color-blue"
                    title="Cadastrar férias para este funcionário"
                    onClick={() =>
                      navigate(`/app/cadastrar-ferias/funcionario/${id}`)
                    }
                  >
                    calendar_add_on
                  </button>
                </td>
              )}
            </tr>
          </tfoot>
        </table>
      </div>
    </>
  );
}
