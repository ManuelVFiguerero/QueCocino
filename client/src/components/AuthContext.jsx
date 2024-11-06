// src/components/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import { iniciarSesion, setAuthToken } from '../api'; // Importa setAuthToken aquí

const AuthContext = createContext();

// Hook personalizado para usar el contexto
export const useAuth = () => useContext(AuthContext);

// Proveedor de contexto para envolver la aplicación
export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null); // Estado para almacenar el usuario

    // AuthProvider en AuthContext.jsx
    const login = async (email, contrasena) => {
        try {
            const response = await iniciarSesion(email, contrasena);
            console.log('Respuesta de inicio de sesión:', response);

            setIsAuthenticated(true);
            setUser(response.usuario); // Asegúrate de que `response.usuario` contenga `_id`

            // Almacenar token y userID en localStorage si es necesario
            localStorage.setItem('token', response.token);
            localStorage.setItem('userID', response.usuario._id); // Guardar el `userID` en localStorage
            setAuthToken(response.token); // Configura el token en axios
        } catch (error) {
            console.error('Error en la autenticación:', error);
            throw error;
        }
    };


    // Función para cerrar sesión
    const logout = () => {
        setIsAuthenticated(false);
        setUser(null); // Limpia el usuario
        // Si tienes un token en localStorage, puedes eliminarlo aquí
        // localStorage.removeItem('token');
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
