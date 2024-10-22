import React, { useState } from 'react';
import { slide as Menu } from 'react-burger-menu';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faUserPlus, faInfoCircle, faHome, faBars } from '@fortawesome/free-solid-svg-icons'; // Asegúrate de importar faBars también

const NavBar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);  // Estado para manejar si el menú está abierto

  const toggleMenu = () => {
    setIsOpen(!isOpen);  // Cambia el estado del menú (abrir/cerrar)
  };

  return (
    <nav className="bg-white h-16 flex justify-between items-center px-4">
      {/* Ícono de la casa alineado a la izquierda */}
      <div onClick={() => navigate('/')} className="cursor-pointer">
        <FontAwesomeIcon icon={faHome} className="text-black text-2xl" />
      </div>

      {/* Menú burger con Tailwind CSS */}
      <div className="relative z-50">  {/* z-50 para asegurar que esté al frente */}
        {/* Icono de las tres rayas */}
        <button onClick={toggleMenu} className="focus:outline-none">
          <FontAwesomeIcon icon={faBars} className="text-black text-2xl" />
        </button>

        {/* Menu pop-up */}
        {isOpen && (
          <div className="absolute top-12 right-0 bg-white shadow-lg rounded-lg w-52 py-4 px-6 z-50">
            <button onClick={toggleMenu} className="absolute top-2 right-2 text-gray-500 focus:outline-none">
              &#10005; {/* Esto es la "X" */}
            </button>
            <div className="space-y-4">
              <a onClick={() => { navigate('/login'); toggleMenu(); }} className="flex items-center space-x-2 text-gray-700 hover:text-blue-500 cursor-pointer">
                <FontAwesomeIcon icon={faUser} />
                <span>Iniciar Sesión</span>
              </a>
              <a onClick={() => { navigate('/register'); toggleMenu(); }} className="flex items-center space-x-2 text-gray-700 hover:text-blue-500 cursor-pointer">
                <FontAwesomeIcon icon={faUserPlus} />
                <span>Registrarse</span>
              </a>
              <a onClick={() => { navigate('/about'); toggleMenu(); }} className="flex items-center space-x-2 text-gray-700 hover:text-blue-500 cursor-pointer">
                <FontAwesomeIcon icon={faInfoCircle} />
                <span>Nosotros</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;








