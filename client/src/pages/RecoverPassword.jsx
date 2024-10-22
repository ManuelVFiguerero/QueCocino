import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope} from '@fortawesome/free-solid-svg-icons';
import capybara from '../assets/capibaraConfundido.webp';



const RecoverPassword = () => {
    const [email, setEmail] = useState('');
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-[#FFFFFF] to-brown-200"> 
            <img src={capybara} alt="Logo Que Cocino" className="w-32 mb-4" />
            <h1 className="text-4xl font-bold text-brown mb-4">Recuperar Contraseña</h1>
            <div className="flex items-center border-2 border-brown rounded-md bg-white mb-4 w-full max-w-sm"> {/* Cambié max-w-lg por max-w-md */}
                <FontAwesomeIcon icon={faEnvelope} className="ml-2" />
                <input
                    type="email"
                    placeholder="Ingrese su Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="p-3 focus:outline-none focus:ring-2 focus:ring-brown w-full"
                />
            </div>
            <button className="bg-brown text-white p-3 rounded-md hover:bg-brown-700 transition duration-200 mb-4 max-w-md"> {/* Cambié max-w-lg por max-w-md */}
                Solicitar Blanqueo
            </button>
            <p className="text-brown">
                ¿Tenes Cuenta? <a href="/login" className="text-brown-600 hover:underline">Iniciar Sesion</a>
            </p>
            <br />
            <p className="text-brown">
                ¿No tenes Cuenta? <a href="/register" className="text-brown-600 hover:underline">Registrarse</a>
            </p>
        </div>
    );
};

export default RecoverPassword;


