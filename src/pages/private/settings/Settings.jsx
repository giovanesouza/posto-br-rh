import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ToastAnimated, { showToast } from "../../../components/ui-lib/Toast.jsx";
import { InputGroup } from "../../../components/inputGroup/InputGroup.jsx";
import { Button } from "../../../components/button/Button.jsx";
import { findUserById, updateUser } from "../../../services/userService.jsx";
import {
  isEmailValid as IsEmailValid,
  isPasswordValid as IsPasswordValid,
} from "../../../utils/formValidation/regexFieldValidation.js";

export default function Settings() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [fieldValue, setFieldValue] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    getUserById(id);
  }, []);

  const getUserById = async (userId) => {
    try {
      const response = await findUserById(userId);
      if (response) {
        setFieldValue({
          email: response.email,
          password: "",
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
    const { name, value } = e.target;
    setFieldValue({
      ...fieldValue,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isEmailValid = IsEmailValid(fieldValue.email);

    if (!isEmailValid) {
      showToast({
        type: "error",
        message: "Verifique se o campo e-mail foi preenchido corretamente.",
      });
      return;
    }

    try {
      await updateUser(id, fieldValue);
      alert(
        `Login atualizado com sucesso!\nUtilize as informações atualizadas no seu próximo login.`
      );
      navigate("/app/funcionarios");
    } catch (error) {
      showToast({ type: "error", message: error.response.data.message });
    }
  };

  return (
    <>
      <ToastAnimated />
      <h1 style={{ marginBottom: "4rem" }} className="text-align-center">
        Editar login
      </h1>
      <form onSubmit={handleSubmit}>
        <InputGroup
          name="email"
          type="text"
          value={fieldValue.email}
          placeholder="E-mail"
          autoFocus="true"
          onChange={handleChange}
          inputClassName={
            fieldValue.email
              ? IsEmailValid(fieldValue.email)
                ? "input-success"
                : "input-error"
              : ""
          }
        />

        <InputGroup
          name="password"
          type="password"
          value={fieldValue.password}
          placeholder="Senha"
          minLength="6"
          maxLength="20"
          onChange={handleChange}
          inputClassName={
            fieldValue.password
              ? IsPasswordValid(fieldValue.password)
                ? "input-success"
                : "input-error"
              : ""
          }
        />

        <div className="alert">
          <span className="material-symbols-outlined">info</span>
          Caso não queira mudar a senha, deixe o campo "Senha" em branco.
        </div>

        <Button type="submit" content="Atualizar login" />
      </form>
    </>
  );
}
