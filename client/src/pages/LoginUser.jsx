import React, { useState } from 'react';
import logo from '../assets/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/AuthContext';

const LoginUser = () => {
  const [email, setEmail] = useState('');
  const [contrasena, setContrasena] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await login(email, contrasena);
      navigate('/'); 
    } catch (error) {
      console.error('Error en inicio de sesión:', error);
      alert('Error al iniciar sesión. Verifica tus credenciales.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-[#FFFFFF] to-brown-200">
      <img src={logo} alt="Logo Que Cocino" className="w-40 h-40 mb-5" />
      <h1 className="text-4xl font-bold text-brown mb-4">Iniciar Sesion</h1>
      <div className="flex items-center border-2 border-brown rounded-md bg-white mb-4 w-full max-w-sm">
        <FontAwesomeIcon icon={faEnvelope} className="ml-2" />
        <input
          type="email"
          placeholder="Ingrese su Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-3 focus:outline-none focus:ring-2 focus:ring-brown w-full"
        />
      </div>
      <div className="flex items-center border-2 border-brown rounded-md bg-white mb-4 w-full max-w-sm">
        <FontAwesomeIcon icon={faLock} className="ml-2" />
        <input
          type="password"
          placeholder="Ingrese su Contraseña"
          value={contrasena}
          onChange={(e) => setContrasena(e.target.value)}
          className="p-3 focus:outline-none focus:ring-2 focus:ring-brown w-full"
        />
      </div>
      <button 
        onClick={handleLogin} 
        className="bg-brown text-white p-3 rounded-md hover:bg-brown-700 transition duration-200 mb-4 max-w-md"
      >
        Iniciar Sesion
      </button>
      <p className="text-brown">
        <a href="/RecoverPassword" className="text-brown-600 hover:underline">¿Olvidaste tu contraseña?</a>
      </p>
      <br />
      <p className="text-brown">
        ¿No tienes Cuenta? <a href="/register" className="text-brown-600 hover:underline">Registrarse</a>
      </p>
    </div>
  );
};

export default LoginUser;
