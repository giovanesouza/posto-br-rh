import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export const ProtectedRoute = ({children}) => {
    
    const {userLogged, userInfo, isAdmin} = useContext(AuthContext); 
    const allowedProfiles = ["employee", "manager", "admin"];

    if(!userLogged) return <Navigate to='/' />; 
    
    if(!isAdmin && !allowedProfiles.includes(userInfo.profile)) return <h1 className="text-align-center color-danger">! (401) Acesso negado!</h1>

    return children;
};