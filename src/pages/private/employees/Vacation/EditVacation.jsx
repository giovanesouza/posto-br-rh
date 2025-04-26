import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ToastAnimated, {
  showToast,
} from "../../../../components/ui-lib/Toast.jsx";
import { InputGroup } from "../../../../components/inputGroup/InputGroup.jsx";
import { Button } from "../../../../components/button/Button.jsx";
import {
  findVacationById,
  updateVacation,
} from "../../../../services/vacationService.jsx";

export default function EditVacation() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [vacation, setVacation] = useState({});

  const [fieldValue, setFieldValue] = useState({
    employeeId: "",
    isVacationSold: false,
    soldDays: 0,
    startDate: "",
    endDate: "",
  });

  useEffect(() => {
    getVacationById(id);
  }, []);

  const getVacationById = async (vacationId) => {
    try {
      const response = await findVacationById(vacationId);
      if (response) {
        setVacation(response);
        setFieldValue({
          employeeId: response.employee.id,
          isVacationSold: response.isVacationSold,
          soldDays: response.soldDays,
          startDate: response.startDate.slice(0, 10),
          endDate: response.endDate.slice(0, 10),
        });
      }
    } catch (error) {
      showToast({
        type: "error",
        message: `${error.response.data.message}`,
      });
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
        endDate: endDate.toISOString().split("T")[0], // Formato YYYY-MM-DD
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const updatedVacation = {
        employeeId: vacation.employee.id,
        isVacationSold: fieldValue.isVacationSold,
        soldDays: parseInt(fieldValue.soldDays),
        startDate: new Date(fieldValue.startDate).toISOString(),
        endDate: new Date(fieldValue.endDate).toISOString(),
      };
      await updateVacation(id, updatedVacation);
      navigate("/app/funcionarios", {
        state: `Férias do funcionário << ${vacation.employee.name} >> atualizada com sucesso!`,
      });
    } catch (error) {
      showToast({ type: "error", message: error.response.data.message });
    }
  };

  return (
    <>
    <ToastAnimated />
      <div style={{ marginBottom: "4rem" }} className="text-align-center">
        <h1 style={{ marginBottom: "1rem" }}>Editar férias</h1>
        <p>
          <strong>Colaborador:</strong> {vacation.employee?.name}
        </p>
      </div>
      <form onSubmit={handleSubmit}>
        <InputGroup
          label="Férias vendidas?"
          type="checkbox"
          name="isVacationSold"
          value={fieldValue.isVacationSold}
          onChange={handleChange}
          checked={fieldValue.isVacationSold}
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
          readOnly={true}
        />

        <Button type="submit" content="Atualizar férias" />
      </form>
    </>
  );
}
