import { useState } from "react";
import { Header } from "../../../../components/header/Header";
import { InputGroup } from "../../../../components/inputGroup/InputGroup";
import { Button } from "../../../../components/button/Button";
import { formatCPF } from "../../../../utils/formValidation/regexFieldValidation.js";

export const RegisterEmployee = () => {
  const [fieldValue, setFieldValue] = useState({
    employeeName: "",
    cpf: "",
    admissionDate: "",
    pendingVacation: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const formattedValue = name === "cpf" ? formatCPF(value) : value;

    setFieldValue({
      ...fieldValue,
      [name]: formattedValue,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <>
      <Header />
      <form onSubmit={handleSubmit}>
        <InputGroup
          label="Nome:"
          type="text"
          name="employeeName"
          value={fieldValue.employeeName}
          placeholder="Informe o nome do funcionário"
          onChange={handleChange}
          autoFocus="true"
        />

        <InputGroup
          label="CPF:"
          type="text"
          name="cpf"
          value={fieldValue.cpf}
          placeholder="Informe o CPF do funcionário"
          maxLength="14"
          onChange={handleChange}
        />

        <InputGroup
          label="Data de Admissão:"
          type="date"
          name="admissionDate"
          value={fieldValue.admissionDate}
          onChange={handleChange}
        />

        <InputGroup
          label="Férias pendentes?"
          type="checkbox"
          name="pendingVacation"
          value={fieldValue.pendingVacation}
          onChange={handleChange}
        />

        <Button type="submit" content="Cadastrar" />
      </form>
    </>
  );
};
