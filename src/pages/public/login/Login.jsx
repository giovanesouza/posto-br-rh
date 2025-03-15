import "./Login.css";
import Logo from "../../../assets/logo.png";
import { useState } from "react";

export default function Login() {
  const [fieldValue, setFieldValue] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFieldValue({
      ...fieldValue,
      [name]: value,
    });
  };

  return (
    <form>
      <div className="form-header">
        <img src={Logo} alt="logo - Posto BR" />
        <h1>LOGIN - RH</h1>
      </div>

      <div>
        <input
          name="email"
          type="email"
          value={fieldValue.email}
          placeholder="E-mail"
          autoFocus="true"
          onChange={handleChange}
          required
        />
        <input
          name="password"
          type="password"
          value={fieldValue.password}
          placeholder="Senha"
          onChange={handleChange}
          required
        />

        <button type="submit">Entrar</button>
      </div>
    </form>
  );
}
