import Logo from "../../../assets/logo.png";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContext.jsx";
import { InputGroup } from "../../../components/inputGroup/InputGroup";
import { Button } from "../../../components/button/Button";
import ToastAnimated, { showToast } from "../../../components/ui-lib/Toast.jsx";
import {
  isEmailValid as IsEmailValid,
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
    email: "",
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

    const isEmailValid = IsEmailValid(fieldValue.email);
    const isPasswordvalid = IsPasswordValid(fieldValue.senha);

    if (!isEmailValid || !isPasswordvalid) {
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
            name="email"
            type="text"
            value={fieldValue.email}
            placeholder="E-mail"
            autoFocus="true"
            onChange={handleChange}
            inputClassName={fieldValue.email ? IsEmailValid(fieldValue.email) ? "input-success" : "input-error" : ""}
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
          />

          <Button type="submit" content="Entrar" />
        </div>
      </form>
    </main>
  );
}
