import React, { useState } from 'react';
import { slide as Menu } from 'react-burger-menu';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faUserPlus, faInfoCircle, faHome, faBars, faSearch, faPlus, faHeart, faBook, faUserCircle, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from './AuthContext';  // Importamos el contexto de autenticación

const NavBar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();  // Obtenemos el estado de autenticación

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white h-16 flex justify-between items-center px-4">
      {/* Ícono de la casa alineado a la izquierda */}
      <div onClick={() => navigate('/')} className="cursor-pointer">
        <FontAwesomeIcon icon={faHome} className="text-black text-2xl" />
      </div>

      {/* Menú burger */}
      <div className="relative z-50">
        <button onClick={toggleMenu} className="focus:outline-none">
          <FontAwesomeIcon icon={faBars} className="text-black text-2xl" />
        </button>

        {isOpen && (
          <div className="absolute top-12 right-0 bg-white shadow-lg rounded-lg w-52 py-4 px-6 z-50">
            <button onClick={toggleMenu} className="absolute top-2 right-2 text-gray-500 focus:outline-none">
              &#10005;
            </button>

            {/* Opciones de menú según el estado de autenticación */}
            {isAuthenticated ? (
              <div className="space-y-4">
                <a onClick={() => { navigate('/myrecipes'); toggleMenu(); }} className="flex items-center space-x-2 text-gray-700 hover:text-blue-500 cursor-pointer">
                  <FontAwesomeIcon icon={faBook} />
                  <span>Mis Recetas</span>
                </a>
                <a onClick={() => { navigate('/favrecipes'); toggleMenu(); }} className="flex items-center space-x-2 text-gray-700 hover:text-blue-500 cursor-pointer">
                  <FontAwesomeIcon icon={faHeart} />
                  <span>Recetas Favoritas</span>
                </a>
                <a onClick={() => { navigate('/createrecipe'); toggleMenu(); }} className="flex items-center space-x-2 text-gray-700 hover:text-blue-500 cursor-pointer">
                  <FontAwesomeIcon icon={faPlus} />
                  <span>Crear Receta</span>
                </a>
                <a onClick={() => { navigate('/profile'); toggleMenu(); }} className="flex items-center space-x-2 text-gray-700 hover:text-blue-500 cursor-pointer">
                  <FontAwesomeIcon icon={faUserCircle} />
                  <span>Mi Perfil</span>
                </a>
                <a onClick={() => { logout(); navigate('/'); toggleMenu(); }} className="flex items-center space-x-2 text-gray-700 hover:text-blue-500 cursor-pointer">
                  <FontAwesomeIcon icon={faSignOutAlt} />
                  <span>Cerrar Sesión</span>
                </a>

              </div>
            ) : (
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
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
