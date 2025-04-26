import { createContext } from 'react';
import useAuth from '../hooks/useAuth'; // Hook criado para autenticação

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const { userLogged, loading, loginUser, logoutUser, isAdmin, userInfo  } = useAuth();

    if (loading) {
        return(
            <div style={{display: 'flex', justifyContent: 'center'}}>
                  <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>    
            </div>
        );
    }

    return (
        <AuthContext.Provider value={{ userLogged, loading, loginUser, logoutUser, isAdmin, userInfo }}>
            {children}
        </AuthContext.Provider>
    );
}