import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./Header.css";

export const Header = () => {
  const { logoutUser, userInfo } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuOpen((prevState) => !prevState);
  };

  return (
    <header>
      <nav>
        <div className="material-symbols-outlined tootle" onClick={toggleMenu}>
          menu
        </div>
        <ul className={menuOpen ? "menu-visible" : "menu-hidden"}>
          <Link to="/app/funcionarios">
            <li>Listar funcionários</li>
          </Link>
          <Link to="/app/cadastrar-funcionario">
            <li>Cadastrar funcionário</li>
          </Link>
        </ul>
        <div className="right-menu">
          <button
            className="material-symbols-outlined"
            title="Configurações do Admin"
            onClick={() => navigate(`/app/settings/atualizar-login/user/${userInfo.id}`)}
          >
            settings
          </button>
          <button
            className="material-symbols-outlined logout"
            title="Sair"
            onClick={() => logoutUser()}
          >
            logout
          </button>
        </div>
      </nav>
    </header>
  );
};
