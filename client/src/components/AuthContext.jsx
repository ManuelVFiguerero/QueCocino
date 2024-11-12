import React, { createContext, useState, useContext, useEffect } from 'react';
import { iniciarSesion, setAuthToken } from '../api';

const AuthContext = createContext();

// Hook personalizado para usar el contexto
export const useAuth = () => useContext(AuthContext);

// Proveedor de contexto para envolver la aplicación
export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);

    const login = async (email, contrasena) => {
        try {
            const response = await iniciarSesion(email, contrasena);
            console.log('Respuesta de inicio de sesión:', response);

            setIsAuthenticated(true);
            setUser({
                _id: response.usuario._id,
                email: response.usuario.email,
                restricciones: response.usuario.restricciones || [] // Incluye restricciones directamente
            });

            localStorage.setItem('token', response.token);
            localStorage.setItem('userID', response.usuario._id);
            setAuthToken(response.token);
        } catch (error) {
            console.error('Error en la autenticación:', error);
            throw error;
        }
    };

    const logout = () => {
        setIsAuthenticated(false);
        setUser(null);
        localStorage.removeItem('token');
        localStorage.removeItem('userID');
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        const userID = localStorage.getItem('userID');
        if (token && userID) {
            setAuthToken(token);
            setIsAuthenticated(true);
            // Aquí podríamos hacer una solicitud para obtener el usuario completo, incluyendo restricciones
        }
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
