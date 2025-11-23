import "./RegisterUser.css";
import { useEffect, useState } from "react";
import { InputGroup } from "../../../../components/inputGroup/InputGroup.jsx";
import { Button } from "../../../../components/button/Button.jsx";
import {
  isUsernameValid as IsUsernameValid,
  isPasswordValid as IsPasswordValid,
} from "../../../../utils/formValidation/regexFieldValidation.js";
import ToastAnimated, {
  showToast,
} from "../../../../components/ui-lib/Toast.jsx";
import { findAllEmployees } from "../../../../services/employeesService.jsx";
import { createUser } from "../../../../services/userService.jsx";

export default function RegisterUser() {

  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState({});
  const [fieldValue, setFieldValue] = useState({
    username: "",
    password: "",
    employeeId: "",
    isAdmin: false,
  });

  useEffect(() => {
    getAllEmployees();
  }, []);

  useEffect(() => {
    setFieldValue((prev) => ({
      ...prev,
      employeeId: selectedEmployee.id,
      password: selectedEmployee.cpf,
      isAdmin: selectedEmployee.isAdmin || false,
    }));
  }, [selectedEmployee]);

  const getAllEmployees = async () => {
    try {
      const response = await findAllEmployees("");
      if (response) setEmployees(response);
    } catch (error) {
      showToast({ type: "error", message: error.response.data.message });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFieldValue({
      ...fieldValue,
      [name]: value,
    });
  };

  const handleSelectEmployee = (e) => {
    const selectedId = e.target.value;
    const selected = employees.find((employee) => employee.id === selectedId);
    setSelectedEmployee(selected || {});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!IsUsernameValid(fieldValue.username)) {
       showToast({
        type: "error",
        message: "Verifique se os campos foram preenchidos corretamente.",
      });
      return;
    }

    try {
      await createUser(fieldValue);
      showToast({ type: "success", message: `Usuário cadastrado com sucesso para o(a) funcionário(a): ${selectedEmployee.name}!`});
      setTimeout(() => window.location.reload(), 2000) ;
    } catch (error) {
      showToast({ type: "error", message: error.response.data.message });
    }
  };

  return (
    <>
      <ToastAnimated />
      <h1 style={{ marginBottom: "3rem", textAlign: "center" }}>
        Cadastrar Login Para Funcionário
      </h1>

      <div className="container-message-user">
        <p className="font-weight-bold">
          Agora o funcionário pode acompanhar o seu histórico de férias
          diretamente pelo RH. 🎉
        </p>
        <p className="text-decoration-underline">
          Crie um login para o funcionário. É Simples!
        </p>
        <ol>
          <li>1. Selecione o nome do funcionário na lista - <span className="warning">usuários que não podem ser selecionados já têm cadastro</span>;</li>
          <li>
            2. Digite o nome do usuário: deve conter de 12 a 20 letras -{" "}
            <span className="warning">
              ❌ Não pode conter espaços, números e símbolos;
            </span>
          </li>
          <li>3. Clique em no botão 'Criar usuário';</li>
        </ol>

        <p className="font-weight-bold">
          O nome do USUÁRIO será o que você cadastrar e a{" "}
          <span className="warning">
            SENHA será o NÚMERO DO CPF COM pontuações e traço.
          </span>
        </p>
        <p>
          <span className="warning">
            Exemplo: Usuário = joaopaulo | Senha = 441.791.530-09
          </span>
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="select-user">Funcionários:</label>

          <select
            name={fieldValue.employeeId}
            id="select-user"
            onChange={handleSelectEmployee}
            required
          >
            <option value="0" disabled selected>
              Selecione o funcionário
            </option>
            {employees.map((employee) => (
              <option
                key={employee.id}
                value={employee.id}
                disabled={employee.user}
                className={employee.user && "employee-with-user"}
              >
                {employee.name}
              </option>
            ))}
          </select>
        </div>

        <InputGroup
          label="Usuário:"
          type="text"
          name="username"
          value={fieldValue.username}
          onChange={handleChange}
          minLength="12"
          maxLength="20"
          inputClassName={
            fieldValue.username
              ? IsUsernameValid(fieldValue.username)
                ? "input-success"
                : "input-error"
              : ""
          }
          placeholder="Defina o nome do usuário"
          autoFocus="true"
        />

        <InputGroup
          label="Senha:"
          type="password"
          name="password"
          minLength="6"
          maxLength="20"
          inputClassName={
            fieldValue.password
              ? IsPasswordValid(fieldValue.password)
                ? "input-success"
                : "input-error"
              : ""
          }
          value={fieldValue.password}
          disabled={true}
        />

        <Button type="submit" content="Criar usuário" />
      </form>
    </>
  );
}
