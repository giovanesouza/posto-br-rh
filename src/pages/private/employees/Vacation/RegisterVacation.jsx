import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { findEmployeeById } from "../../../../services/employeesService.jsx";
import ToastAnimated, {
  showToast,
} from "../../../../components/ui-lib/Toast.jsx";
import { InputGroup } from "../../../../components/inputGroup/InputGroup.jsx";
import { Button } from "../../../../components/button/Button.jsx";
import { createVacation } from "../../../../services/vacationService.jsx";

export default function RegisterVacation() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState({});

  const [fieldValue, setFieldValue] = useState({
    employeeId: id,
    isVacationSold: false,
    soldDays: 0,
    startDate: "",
    endDate: "",
  });

  useEffect(() => {
    getEmployeeById(id);
  }, []);

  const getEmployeeById = async (employId) => {
    try {
      const response = await findEmployeeById(employId);
      if (response) setEmployee(response);
    } catch (error) {
      const { message, status } = error.response;
      status >= 400 && showToast({ type: "error", message: message });
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    const regex = /^\d{1,2}$/;
    if (name == "soldDays" && !regex.test(value)) return;

    setFieldValue((prev) => {
      const updatedField = { ...prev, [name]: newValue };

      if (name === "isVacationSold") {
        updatedField.soldDays = checked ? prev.soldDays : 0;
      }

      calculateEndDate(updatedField);
      return updatedField;
    });
  };

  const calculateEndDate = (fields) => {
    const { startDate, isVacationSold, soldDays } = fields;
    const MAX_DAYS_VACATION = 30;
    if (startDate) {
      const start = new Date(startDate);
      const totalDays = isVacationSold
        ? MAX_DAYS_VACATION - parseInt(soldDays)
        : MAX_DAYS_VACATION;
      const endDate = new Date(start);

      endDate.setDate(start.getDate() + totalDays - 1);

      setFieldValue((prev) => ({
        ...prev,
        endDate: endDate.toISOString().split("T")[0],
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const vacation = {
        employeeId: fieldValue.employeeId,
        isVacationSold: fieldValue.isVacationSold,
        soldDays: parseInt(fieldValue.soldDays),
        startDate: new Date(fieldValue.startDate).toISOString(),
        endDate: new Date(fieldValue.endDate).toISOString(),
      }
      await createVacation(vacation);
      navigate("/app/funcionarios", {
        state: `Férias cadastrada com sucesso para o funcionário: ${employee.name}!`,
      });
    } catch (error) {
      showToast({ type: "error", message: error.response.data.message });
    }
  };

  return (
    <>
    <div style={{marginBottom: "4rem" }} className="text-align-center"> 
    <h1 style={{marginBottom: "1rem" }}>Cadastrar férias</h1>
      <p><strong>Colaborador:</strong> {employee.name}</p>

    </div>
      <form onSubmit={handleSubmit}>
        <InputGroup
          label="Férias vendidas?"
          type="checkbox"
          name="isVacationSold"
          value={fieldValue.isVacationSold}
          onChange={handleChange}
        />

        <InputGroup
          label="Dias vendidos:"
          type="number"
          name="soldDays"
          placeholder="Informe o TOTAL de dias vendidos"
          step="1"
          min="0"
          max="10"
          disabled={!fieldValue.isVacationSold}
          value={fieldValue.soldDays}
          onChange={handleChange}
        />

        <InputGroup
          label="Data inicial:"
          type="date"
          name="startDate"
          value={fieldValue.startDate}
          onChange={handleChange}
        />

        <InputGroup
          label="Data final:"
          type="date"
          name="endDate"
          value={fieldValue.endDate}
          onChange={handleChange}
          readOnly="true"
        />

        <Button type="submit" content="Cadastrar férias" />
      </form>
    </>
  );
}
