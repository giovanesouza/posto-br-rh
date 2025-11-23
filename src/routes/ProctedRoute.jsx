import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import UnauthorizedImg from "../assets/error_401.png";

export const ProtectedRoute = ({ children, allowedProfiles = [] }) => {
  
  const { userLogged, userInfo, isAdmin } = useContext(AuthContext);

  if (!userLogged) return <Navigate to="/" />;

  if (!isAdmin && !allowedProfiles.includes(userInfo.profile)) {
    return (
      <div className="text-align-center color-danger">
        <img
          src={UnauthorizedImg}
          style={{ maxWidth: "600px", width: "100%" }}
          alt="Acesso não autorizado!"
          title="Acesso não autorizado!"
        />
      </div>
    );
  }

  return children;
};
