import { Link } from "react-router-dom";
import "./Header.css";

export const Header = () => {
    return(
        <header>
            <nav>
                <ul>
                    <Link to=''><li>Cadastrar funcionário</li></Link>
                    <Link to=''><li>Registrar férias</li></Link>
                    <Link to=''><li>Listar</li></Link>
                </ul>
            </nav>
        </header>
    );
};