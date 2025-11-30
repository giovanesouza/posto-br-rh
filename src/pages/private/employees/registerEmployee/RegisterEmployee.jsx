import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { InputGroup } from "../../../../components/inputGroup/InputGroup";
import { Button } from "../../../../components/button/Button";
import {
  isNameValid,
  formatCPF,
  validateCPF,
} from "../../../../utils/formValidation/regexFieldValidation.js";
import ToastAnimated, {
  showToast,
} from "../../../../components/ui-lib/Toast.jsx";
import { createEmployee } from "../../../../services/employeesService.jsx";

export default function RegisterEmployee() {
  const navigate = useNavigate();

  const [fieldValue, setFieldValue] = useState({
    employeeName: "",
    cpf: "",
    admissionDate: "",
  });

  const formatValue = (name, value) => {
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
    if (!fieldValue.admissionDate) {
      showToast({ type: "error", message: "O campo data de admissão é obrigatório!" });
      return;
    }

    try {
      const employee = {
        name: fieldValue.employeeName,
        cpf: fieldValue.cpf,
        admissionDate: fieldValue.admissionDate,
        isPendingVacation: false,
      };
      await createEmployee(employee);
      navigate("/app/funcionarios", {
        state: `Funcionário "${fieldValue.employeeName}" cadastrado com sucesso!`,
      });
    } catch (error) {
      showToast({ type: "error", message: error.response.data.message });
    }
  };

  return (
    <>
      <ToastAnimated />
      <h1 style={{ marginBottom: "5rem", textAlign: "center" }}>
        Cadastrar funcionário
      </h1>
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

        <Button type="submit" content="Cadastrar" />
      </form>
    </>
  );
}
