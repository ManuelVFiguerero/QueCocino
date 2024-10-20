import React from 'react';
import { useState } from 'react';
import logo from '../assets/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';

const RegisterUser = () => {
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [email, setEmail] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [confirmarContrasena, setConfirmarContrasena] = useState('');

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-brown-100 to-brown-600 p-4">
            <img src={logo} alt="Logo Que Cocino" className="w-32 mb-4" />
            <h1 className="text-4xl font-bold text-brown mb-4">Registrarse</h1>
            <div className="flex space-x-4 mb-4 w-full max-w-lg">
                <div className="flex items-center border-2 border-brown rounded-md bg-white w-full">
                    <FontAwesomeIcon icon={faUser} className="ml-2" />
                    <input
                        type="text"
                        placeholder="Ingrese su Nombre"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        className="p-3 focus:outline-none focus:ring-2 focus:ring-brown w-full"
                    />
                </div>
                <div className="flex items-center border-2 border-brown rounded-md bg-white w-full">
                    <FontAwesomeIcon icon={faUser} className="ml-2" />
                    <input
                        type="text"
                        placeholder="Ingrese su Apellido"
                        value={apellido}
                        onChange={(e) => setApellido(e.target.value)}
                        className="p-3 focus:outline-none focus:ring-2 focus:ring-brown w-full"
                    />
                </div>
            </div>
            <div className="flex items-center border-2 border-brown rounded-md bg-white mb-4 w-full max-w-lg">
                <FontAwesomeIcon icon={faEnvelope} className="ml-2" />
                <input
                    type="email"
                    placeholder="Ingrese su Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="p-3 focus:outline-none focus:ring-2 focus:ring-brown w-full"
                />
            </div>
            <div className="flex items-center border-2 border-brown rounded-md bg-white mb-4 w-full max-w-lg">
                <FontAwesomeIcon icon={faLock} className="ml-2" />
                <input
                    type="password"
                    placeholder="Ingrese su Contraseña"
                    value={contrasena}
                    onChange={(e) => setContrasena(e.target.value)}
                    className="p-3 focus:outline-none focus:ring-2 focus:ring-brown w-full"
                />
            </div>
            <div className="flex items-center border-2 border-brown rounded-md bg-white mb-4 w-full max-w-lg">
                <FontAwesomeIcon icon={faLock} className="ml-2" />
                <input
                    type="password"
                    placeholder="Confirme su Contraseña"
                    value={confirmarContrasena}
                    onChange={(e) => setConfirmarContrasena(e.target.value)}
                    className="p-3 focus:outline-none focus:ring-2 focus:ring-brown w-full"
                />
            </div>
            <button className="bg-brown text-white p-3 rounded-md hover:bg-brown-700 transition duration-200 mb-4 max-w-lg">
                Registrarse
            </button>
            <p className="text-brown">
                ¿Tienes Cuenta? <a href="/login" className="text-brown-600 hover:underline">Iniciar Sesión</a>
            </p>
        </div>
    );
};

export default RegisterUser;


