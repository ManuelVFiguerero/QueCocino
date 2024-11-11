import React, { useState } from 'react';
import logo from '../assets/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faKey, faSignOutAlt, faTrashAlt, faLeaf, faBreadSlice, faTint, faCarrot, faFire } from '@fortawesome/free-solid-svg-icons';

const MyProfile = () => {
  const [name, setName] = useState("NombreActual");
  const [preferences, setPreferences] = useState({
    vegetarian: false,
    vegan: true,
    celiac: false,
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

  // Opciones de preferencias con iconos y colores
  const preferenceOptions = [
    { name: 'vegetarian', label: 'Apto Vegetariano', icon: faCarrot, color: 'bg-green-200 text-green-800', inactiveColor: 'bg-gray-200 text-gray-600' },
    { name: 'vegan', label: 'Apto Vegano', icon: faLeaf, color: 'bg-green-100 text-green-700', inactiveColor: 'bg-gray-200 text-gray-600' },
    { name: 'celiac', label: 'Sin TACC', icon: faBreadSlice, color: 'bg-red-200 text-red-800', inactiveColor: 'bg-gray-200 text-gray-600' },
    { name: 'keto', label: 'Keto', icon: faFire, color: 'bg-orange-200 text-orange-800', inactiveColor: 'bg-gray-200 text-gray-600' },
    { name: 'lactoseFree', label: 'Sin Lactosa', icon: faTint, color: 'bg-blue-200 text-blue-800', inactiveColor: 'bg-gray-200 text-gray-600' },
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
            className="bg-brown text-white px-3 py-2 rounded-full mb-4 hover:bg-brown-900 transition duration-200 flex items-center space-x-2"
          >
            <FontAwesomeIcon icon={faEdit} />
            <span>Cambiar Nombre</span>
          </button>
          <button
            onClick={handlePasswordChange}
            className="bg-brown text-white px-3 py-2 rounded-full mb-4 hover:bg-brown-900 transition duration-200 flex items-center space-x-2"
          >
            <FontAwesomeIcon icon={faKey} />
            <span>Cambiar Contraseña</span>
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-700 text-white px-3 py-2 rounded-full mb-4 hover:bg-red-800 transition duration-200 flex items-center space-x-2"
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
          <div className="space-y-2">
            {preferenceOptions.map((preference) => (
              <button
                key={preference.name}
                onClick={() => handlePreferenceChange(preference.name)}
                className={`flex items-center px-4 py-2 rounded-full space-x-2 ${
                  preferences[preference.name] ? preference.color : preference.inactiveColor
                }`}
              >
                <FontAwesomeIcon icon={preference.icon} />
                <span>{preference.label}</span>
              </button>
            ))}
          </div>
          <button
            onClick={confirmPreferences}
            className="bg-brown text-white px-4 py-2 rounded-full mt-4 hover:bg-brown-900 transition duration-200 flex items-center space-x-2"
          >
            <span>Confirmar Preferencias</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;





