import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/authService';
import api from '../services/apiRH';

const useAuth = () => {
  const [userInfo, setUserInfo] = useState(
    JSON.parse(localStorage.getItem("userInfo"))
  ); 
  const [userLogged, setUserLogged] = useState(false);
  const [loading, setloading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false || userInfo && userInfo.isAdmin);
  const [sessionExpired, setSessionExpired] = useState(false); 
  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo) {
      api.defaults.headers.common["Authorization"] = `Bearer ${userInfo.token}`;
      setUserLogged(true);
    }

    setloading(false);

    const tokenCheckInterval = setInterval(() => {
      if (userInfo) {
        const isTokenExpired = checkTokenExpiration(userInfo.token);
        if (isTokenExpired) setSessionExpired(true);
      }
    }, 60000); // Verifica a cada minuto (60000 ms)

    return () => clearInterval(tokenCheckInterval);
  }, [userInfo]);

  useEffect(() => {
    if (sessionExpired) {
      logoutUser();
    }
  }, [sessionExpired]);

  const checkTokenExpiration = (token) => {
    const decodedToken = JSON.parse(atob(token.split(".")[1]));
    const currentTime = Date.now() / 1000;
    return decodedToken.exp < currentTime;
  };

  const loginUser = async (inputValues) => {
    try {
      const response = await login(inputValues);

      if (response) {
        localStorage.setItem("userInfo", JSON.stringify(response));

        setUserInfo(response);

        api.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${response.token}`;

        setUserLogged(true);
        setIsAdmin(response.isAdmin);
        navigate("/app/funcionarios", {
          state: `Olá, Admin. Seja bem vindo(a)!`,
        });
      }
    } catch (error) {
      throw error;
    }
  };

  const logoutUser = () => {
    localStorage.removeItem("userInfo");
    setUserLogged(false);
    setIsAdmin(false);
    setUserInfo(null);
    setSessionExpired(false);
    navigate("/", {
      state: {
        message: sessionExpired
          ? "Sessão expirada. Faça login novamente."
          : "Desconectado com sucesso.",
      },
    });
  };

  return { userLogged, loading, loginUser, logoutUser, isAdmin, userInfo };
};

export default useAuth;
