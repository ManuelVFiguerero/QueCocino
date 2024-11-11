import React, { useState } from 'react';
import logo from '../assets/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faKey, faSignOutAlt, faTrashAlt, faCheck, faLeaf, faBreadSlice, faTint, faCarrot, faFire, faNut } from '@fortawesome/free-solid-svg-icons';

const MyProfile = () => {
  const [name, setName] = useState("NombreActual");
  const [preferences, setPreferences] = useState({
    vegetarian: false,
    vegan: true,
    celiac: true,
    keto: false,
    lactoseFree: false,
  });

  const handlePreferenceChange = (preference) => {
    setPreferences((prevPreferences) => ({
      ...prevPreferences,
      [preference]: !prevPreferences[preference],
    }));
  };

  const handleNameChange = () => {
    console.log("Nombre cambiado a:", name);
  };

  const handlePasswordChange = () => {
    console.log("Contraseña cambiada");
  };

  const handleLogout = () => {
    console.log("Sesión cerrada");
  };

  const handleDeleteAccount = () => {
    console.log("Cuenta borrada");
  };

  const confirmPreferences = () => {
    console.log("Preferencias confirmadas:", preferences);
  };

  const preferenceOptions = [
    { name: 'vegetarian', label: 'Apto Vegetariano', color: 'bg-green-200 text-green-800', icon: faCarrot },
    { name: 'vegan', label: 'Apto Vegano', color: 'bg-green-100 text-green-700', icon: faLeaf },
    { name: 'celiac', label: 'Sin TACC', color: 'bg-red-200 text-red-800', icon: faBreadSlice },
    { name: 'keto', label: 'Keto', color: 'bg-orange-200 text-orange-800', icon: faFire },
    { name: 'lactoseFree', label: 'Sin Lactosa', color: 'bg-blue-200 text-blue-800', icon: faTint },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-b from-[#FFFFFF] to-[#e5b896] text-brown-800">
      <img src={logo} alt="Logo Que Cocino" className="w-32 my-4" />
      <h1 className="text-3xl font-bold mb-8">Mi Perfil</h1>

      <div className="flex space-x-16">
        {/* Sección de cuenta */}
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-semibold mb-4">Cuenta</h2>
          <input
            type="text"
            value="mail@actual.com"
            disabled
            className="bg-gray-200 text-gray-600 text-center rounded mb-4 w-64"
          />
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-gray-100 border border-gray-300 rounded text-center mb-4 w-64"
          />
          <button
            onClick={handleNameChange}
            className="bg-brown-700 text-white px-3 py-2 rounded-full mb-3 hover:bg-brown-800 transition duration-200 flex items-center space-x-2"
          >
            <FontAwesomeIcon icon={faEdit} />
            <span>Cambiar Nombre</span>
          </button>
          <button
            onClick={handlePasswordChange}
            className="bg-brown-700 text-white px-3 py-2 rounded-full mb-3 hover:bg-brown-800 transition duration-200 flex items-center space-x-2"
          >
            <FontAwesomeIcon icon={faKey} />
            <span>Cambiar Contraseña</span>
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-700 text-white px-3 py-2 rounded-full mb-3 hover:bg-red-800 transition duration-200 flex items-center space-x-2"
          >
            <FontAwesomeIcon icon={faSignOutAlt} />
            <span>Cerrar Sesión</span>
          </button>
          <button
            onClick={handleDeleteAccount}
            className="bg-red-900 text-white px-3 py-2 rounded-full hover:bg-red-950 transition duration-200 flex items-center space-x-2"
          >
            <FontAwesomeIcon icon={faTrashAlt} />
            <span>Borrar Cuenta</span>
          </button>
        </div>

        {/* Sección de preferencias */}
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-semibold mb-4">Preferencias</h2>
          <div className="flex flex-wrap gap-2">
            {preferenceOptions.map(({ name, label, color, icon }) => (
              <button
                key={name}
                onClick={() => handlePreferenceChange(name)}
                className={`${color} flex items-center space-x-2 px-3 py-2 rounded-full transition duration-200`}
              >
                <FontAwesomeIcon icon={icon} />
                <span>{label}</span>
              </button>
            ))}
          </div>
          <button
            onClick={confirmPreferences}
            className="bg-brown-700 text-white px-3 py-2 rounded-full mt-4 hover:bg-brown-800 transition duration-200 flex items-center space-x-2"
          >
            <FontAwesomeIcon icon={faCheck} />
            <span>Confirmar Preferencias</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;





