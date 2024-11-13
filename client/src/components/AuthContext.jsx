import React, { createContext, useState, useContext, useEffect } from 'react';
import { iniciarSesion, setAuthToken, renovarToken } from '../api';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [tokenExpiration, setTokenExpiration] = useState(null);

    const login = async (email, contrasena) => {
        try {
            const response = await iniciarSesion(email, contrasena);
            console.log('Respuesta de inicio de sesión:', response);

            setIsAuthenticated(true);
            setUser({
                _id: response.usuario._id,
                email: response.usuario.email,
                restricciones: response.usuario.restricciones || []
            });

            localStorage.setItem('token', response.token);
            localStorage.setItem('userID', response.usuario._id);
            const expirationTime = Date.now() + 60 * 60 * 1000; 
            localStorage.setItem('tokenExpiration', expirationTime);
            setTokenExpiration(expirationTime);
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
        localStorage.removeItem('tokenExpiration');
        setAuthToken(null);
    };

    const checkTokenExpiration = async () => {
        const expiration = localStorage.getItem('tokenExpiration');
        if (expiration && Date.now() > expiration) {
            console.log('Token expirado. Renovando...');
            await renovarToken(); 
        }
    };

    const renovarToken = async () => {
        try {
            const response = await renovarToken();
            if (response.token) {
                localStorage.setItem('token', response.token);
                const newExpirationTime = Date.now() + 60 * 60 * 1000;
                localStorage.setItem('tokenExpiration', newExpirationTime);
                setTokenExpiration(newExpirationTime);
                setAuthToken(response.token);
            }
        } catch (error) {
            console.error('Error al renovar el token:', error);
            logout(); 
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        const userID = localStorage.getItem('userID');
        const expiration = localStorage.getItem('tokenExpiration');
        if (token && userID && expiration) {
            if (Date.now() < expiration) {
                setAuthToken(token);
                setIsAuthenticated(true);
                setTokenExpiration(expiration);
            } else {
                logout();
            }
        }
    }, []);

    useEffect(() => {
        if (tokenExpiration) {
            const timeLeft = tokenExpiration - Date.now();
            const timeoutId = setTimeout(checkTokenExpiration, timeLeft - 5000);
            return () => clearTimeout(timeoutId);
        }
    }, [tokenExpiration]);

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
