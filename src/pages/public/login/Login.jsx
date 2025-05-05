import Logo from "../../../assets/logo.png";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContext.jsx";
import { InputGroup } from "../../../components/inputGroup/InputGroup";
import { Button } from "../../../components/button/Button";
import ToastAnimated, { showToast } from "../../../components/ui-lib/Toast.jsx";
import {
  isUsernameValid as IsUsernameValid,
  isPasswordValid as IsPasswordValid,
} from "../../../utils/formValidation/regexFieldValidation.js";
import { useLocation } from "react-router-dom";

export default function Login() {
  const { loginUser } = useContext(AuthContext);
  const location = useLocation();
  const { message } = location.state || {};

  useEffect(() => {
    showToast({ type: "info", message: message });
  }, []);

  const [fieldValue, setFieldValue] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFieldValue({
      ...fieldValue,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isUsernameValid = IsUsernameValid(fieldValue.username);
    const isPasswordvalid = IsPasswordValid(fieldValue.password);

    if (!isUsernameValid || !isPasswordvalid) {
      showToast({
        type: "error",
        message: "Verifique se os campos foram preenchidos corretamente.",
      });
      return;
    }

    try {
      await loginUser(fieldValue);
    } catch (error) {
      showToast({ type: "error", message: error.response.data.message });
    }
  };

  return (
    <main className="main-align-center">
      <ToastAnimated />
      <form onSubmit={handleSubmit}>
        <div className="form-header">
          <img src={Logo} alt="logo - Posto BR" />
          <h1>LOGIN - RH</h1>
        </div>

        <div>
          <InputGroup
            name="username"
            type="text"
            value={fieldValue.username}
            placeholder="Usuário"
            autoFocus="true"
            onChange={handleChange}
            minLength="12"
            maxLength="20"
            inputClassName={fieldValue.username ? IsUsernameValid(fieldValue.username) ? "input-success" : "input-error" : ""}
            icon="person"
          />

          <InputGroup
            name="password"
            type="password"
            value={fieldValue.password}
            placeholder="Senha"
            minLength="6"
            maxLength="20"
            onChange={handleChange}
            inputClassName={fieldValue.password ? IsPasswordValid(fieldValue.password) ? "input-success" : "input-error" : ""}
            icon="visibility_off"
          />

          <Button type="submit" content="Entrar" />
        </div>
      </form>
    </main>
  );
}
