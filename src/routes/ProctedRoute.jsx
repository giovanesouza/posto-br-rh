import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";


export const ProtectedRoute = ({children, IsAdmin}) => {
    const {userLogged, isAdmin} = useContext(AuthContext); 

    if(!userLogged) return <Navigate to='/' />; 
    if(!isAdmin) return <h1 className="text-align-center color-danger">! (401) Acesso negado!</h1>

    return children;
};