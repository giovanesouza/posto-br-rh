import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { InputGroup } from "../../../../components/inputGroup/InputGroup.jsx";
import { Button } from "../../../../components/button/Button.jsx";
import {
  formatCPF,
  isNameValid,
  validateCPF,
} from "../../../../utils/formValidation/regexFieldValidation.js";
import ToastAnimated, {
  showToast,
} from "../../../../components/ui-lib/Toast.jsx";
import {
  updateEmployee,
  findEmployeeById,
} from "../../../../services/employeesService.jsx";

export default function EditEmployee() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [fieldValue, setFieldValue] = useState({
    employeeName: "",
    cpf: "",
    admissionDate: "",
  });

  useEffect(() => {
    getEmployeeById();
  }, []);

  const formatValue = (name, value, type) => {
    if (name === "cpf") {
      return formatCPF(value);
    }
    return value;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValueUpdate = type === "checkbox" ? checked : value;

    setFieldValue({
      ...fieldValue,
      [name]: formatValue(name, fieldValueUpdate, type),
    });
  };

  const getEmployeeById = async () => {
    try {
      const response = await findEmployeeById(id);
      if (response) {
        setFieldValue({
          employeeName: response.name,
          cpf: response.cpf,
          admissionDate: response.admissionDate.slice(0, 10),
        });
      }
    } catch (error) {
      showToast({ type: "error", message: error.response.data.message });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const IsNameValid = isNameValid(fieldValue.employeeName);
    const isValidCPF = validateCPF(fieldValue.cpf);

    if (
      !fieldValue.employeeName &&
      !fieldValue.cpf &&
      !fieldValue.admissionDate
    ) {
      showToast({
        type: "error",
        message: "Todos os campos são de preenchimento obrigatório!",
      });
      return;
    }

    if (!IsNameValid) {
      showToast({ type: "error", message: "Nome inválido!" });
      return;
    }
    if (!isValidCPF) {
      showToast({ type: "error", message: "CPF inválido!" });
      return;
    }

    try {
      const employee = {
        name: fieldValue.employeeName,
        cpf: formatCPF(fieldValue.cpf),
        admissionDate: fieldValue.admissionDate.slice(0, 10),
        isPendingVacation: false,
      };
      await updateEmployee(id, employee);
      navigate("/app/funcionarios", {
        state: `Funcionário "${fieldValue.employeeName}" atualizado com sucesso!`,
      });
    } catch (error) {
      showToast({ type: "error", message: error.response.data.message });
    }
  };

  return (
    <>
      <ToastAnimated />
      <h1 style={{marginBottom: "5rem" }} className="text-align-center">Editar funcionário</h1>
      <form onSubmit={handleSubmit}>
        <InputGroup
          label="Nome:"
          type="text"
          name="employeeName"
          value={fieldValue.employeeName}
          placeholder="Informe o nome do funcionário"
          onChange={handleChange}
          autoFocus="true"
          inputClassName={
            fieldValue.employeeName
              ? isNameValid(fieldValue.employeeName)
                ? "input-success"
                : "input-error"
              : ""
          }
        />

        <InputGroup
          label="CPF:"
          type="text"
          name="cpf"
          value={fieldValue.cpf}
          placeholder="Informe o CPF do funcionário"
          maxLength="14"
          onChange={handleChange}
          inputClassName={
            fieldValue.cpf
              ? validateCPF(fieldValue.cpf)
                ? "input-success"
                : "input-error"
              : ""
          }
        />

        <InputGroup
          label="Data de Admissão:"
          type="date"
          name="admissionDate"
          value={fieldValue.admissionDate}
          onChange={handleChange}
        />

        <Button type="submit" content="Atualizar" />
      </form>
    </>
  );
}
