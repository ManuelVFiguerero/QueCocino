import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import logo from '../assets/logo.png';

const LoginUser = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-brown-100 to-brown-600 p-4">
            <img src={logo} alt="Logo Que Cocino" className="w-32 mb-4" />
            <h1 className="text-4xl font-bold text-brown mb-4">Iniciar Sesión</h1>
            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
                <div className="mb-4">
                    <label className="block text-gray-700">Email</label>
                    <div className="flex items-center border border-brown rounded-md">
                        <FontAwesomeIcon icon={faEnvelope} className="ml-2 text-brown" />
                        <input
                            type="email"
                            placeholder="Ingrese su Email"
                            className="flex-grow p-2 focus:outline-none"
                        />
                    </div>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Contraseña</label>
                    <div className="flex items-center border border-brown rounded-md">
                        <FontAwesomeIcon icon={faLock} className="ml-2 text-brown" />
                        <input
                            type="password"
                            placeholder="Ingrese su Contraseña"
                            className="flex-grow p-2 focus:outline-none"
                        />
                    </div>
                </div>
                <button className="w-full bg-brown text-white p-3 rounded-md hover:bg-brown-700 transition duration-200">
                    Iniciar Sesión
                </button>
                <p className="mt-4 text-center text-gray-600 cursor-pointer">¿Olvidaste tu contraseña?</p>
                <p className="mt-4 text-center text-gray-600">No tenés Cuenta?</p>
                <button className="mt-2 text-brown underline">Crear Cuenta</button>
            </div>
        </div>
    );
};

export default LoginUser;
