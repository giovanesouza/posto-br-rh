import { Link } from "react-router-dom";
import "./Footer.css";

export const Footer = () => {
  return (
    <footer>
      <address>
        Desenvolvido por
        <Link to="https://github.com/giovanesouza" target="_blank">
          Giovane Souza |
        </Link>
        <Link to="mailto:developergiovanesouza@gmail.com">
          <span className="material-symbols-outlined">mail</span>
          developergiovanesouza@gmail.com
        </Link>
      </address>
    </footer>
  );
};
