import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import capybara from '../assets/capibaraConfundido.webp';

const RecoverPassword = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-brown-200 to-brown-600">
            <img src={capybara} alt="Logo Que Cocino" className="w-32 mb-4" />
            <h1 className="text-4xl font-bold text-brown mb-4">Recuperar Contraseña</h1>
            <div className="bg-white rounded-lg shadow-md p-6 w-80">
                <div className="mb-4 relative">
                    <label className="block text-sm font-medium text-brown" htmlFor="email">
                        Email
                    </label>
                    <FontAwesomeIcon icon={faEnvelope} className="absolute left-2 top-8 text-brown" />
                    <input
                        type="email"
                        id="email"
                        placeholder="Ingrese su Email"
                        className="w-full p-2 pl-8 border-2 border-brown rounded"
                    />
                </div>
                <button className="bg-brown text-white rounded p-2 w-full mb-4 hover:bg-brown-700 transition duration-200">
                    Solicitar Blanqueo
                </button>
                <p className="text-center text-brown">¿Tienes Cuenta?</p>
                <button className="text-brown font-medium">
                    Iniciar Sesión
                </button>
            </div>
        </div>
    );
};

export default RecoverPassword;


