import Logo from "../../../assets/logo.png";
import { useState } from "react";
import { InputGroup } from "../../../components/inputGroup/InputGroup";
import { Button } from "../../../components/button/Button";
import {
  isEmailValid,
  isPasswordValid,
} from "../../../utils/formValidation/regexFieldValidation.js";

export default function Login() {
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
  };

  return (
    <main>
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
          />

          <InputGroup
            name="password"
            type="password"
            value={fieldValue.password}
            placeholder="Senha"
            onChange={handleChange}
          />
          <Button type="submit" content="Entrar" />
        </div>
      </form>
    </main>
  );
}
