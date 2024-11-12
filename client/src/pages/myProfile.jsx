import React, { useState, useEffect } from 'react';
import logo from '../assets/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faKey, faSignOutAlt, faTrashAlt, faLeaf, faBreadSlice, faTint, faCarrot, faFire } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../components/AuthContext';
import { editarUsuario, eliminarUsuario } from '../api';

const MyProfile = () => {
  const { user, logout } = useAuth();
  const [newPassword, setNewPassword] = useState('');
  const [newName, setNewName] = useState('');
  const [showPasswordPopup, setShowPasswordPopup] = useState(false);
  const [showNamePopup, setShowNamePopup] = useState(false);
  const [preferences, setPreferences] = useState({
    vegetarian: false,
    vegan: false,
    celiac: false,
    keto: false,
    lactoseFree: false,
  });

  // Cargar restricciones del usuario cuando el perfil se carga
  useEffect(() => {
    if (user && user.restricciones) {
      setPreferences({
        vegetarian: user.restricciones.includes('Apto Vegetariano'),
        vegan: user.restricciones.includes('Apto Vegano'),
        celiac: user.restricciones.includes('Sin TACC'),
        keto: user.restricciones.includes('Keto'),
        lactoseFree: user.restricciones.includes('Sin Lactosa'),
      });
    }
  }, [user]);

  const handlePreferenceChange = (preference) => {
    setPreferences((prevPreferences) => ({
      ...prevPreferences,
      [preference]: !prevPreferences[preference],
    }));
  };

  const handleNameChange = async () => {
    try {
      await editarUsuario(user._id, { nombre: newName });
      setShowNamePopup(false);
      alert('Nombre actualizado correctamente.');
    } catch (error) {
      console.error('Error al cambiar el nombre:', error);
      alert('Hubo un error al cambiar el nombre.');
    }
  };

  const handlePasswordChange = async () => {
    try {
      await editarUsuario(user._id, { contrasena: newPassword });
      setShowPasswordPopup(false);
      alert('Contraseña actualizada correctamente.');
    } catch (error) {
      console.error('Error al cambiar la contraseña:', error);
      alert('Hubo un error al cambiar la contraseña.');
    }
  };

  const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm('¿Estás seguro de que deseas eliminar tu cuenta? Esta acción es irreversible.');
    if (confirmDelete) {
      try {
        await eliminarUsuario(user._id);
        logout();
        alert('Cuenta eliminada correctamente.');
      } catch (error) {
        console.error('Error al borrar la cuenta:', error);
        alert('Hubo un error al borrar la cuenta.');
      }
    }
  };

  const confirmPreferences = async () => {
    const updatedRestrictions = [];
    if (preferences.vegetarian) updatedRestrictions.push('Apto Vegetariano');
    if (preferences.vegan) updatedRestrictions.push('Apto Vegano');
    if (preferences.celiac) updatedRestrictions.push('Sin TACC');
    if (preferences.keto) updatedRestrictions.push('Keto');
    if (preferences.lactoseFree) updatedRestrictions.push('Sin Lactosa');

    try {
      await editarUsuario(user._id, { restricciones: updatedRestrictions });
      alert('Preferencias actualizadas correctamente.');
    } catch (error) {
      console.error('Error al actualizar las preferencias:', error);
      alert('Hubo un error al actualizar las preferencias.');
    }
  };

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
            value={user?.email || ''}
            disabled
            className="bg-gray-200 text-gray-600 text-center rounded mb-4 w-64"
          />
          <button
            onClick={() => setShowNamePopup(true)}
            className="bg-brown text-white px-3 py-2 rounded-full mb-4 hover:bg-brown-900 transition duration-200 flex items-center space-x-2"
          >
            <FontAwesomeIcon icon={faEdit} />
            <span>Cambiar Nombre</span>
          </button>
          <button
            onClick={() => setShowPasswordPopup(true)}
            className="bg-brown text-white px-3 py-2 rounded-full mb-4 hover:bg-brown-900 transition duration-200 flex items-center space-x-2"
          >
            <FontAwesomeIcon icon={faKey} />
            <span>Cambiar Contraseña</span>
          </button>
          <button
            onClick={logout}
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
                  user?.restricciones?.includes(preference.label) ? preference.color : preference.inactiveColor
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

      {/* Popup de cambio de contraseña */}
      {showPasswordPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Cambiar Contraseña</h3>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mb-4"
              placeholder="Nueva Contraseña"
            />
            <button
              onClick={handlePasswordChange}
              className="bg-brown text-white px-4 py-2 rounded-full hover:bg-brown-900 transition duration-200"
            >
              Confirmar
            </button>
            <button
              onClick={() => setShowPasswordPopup(false)}
              className="text-red-600 px-4 py-2 mt-2"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      {/* Popup de cambio de nombre */}
      {showNamePopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Cambiar Nombre</h3>
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mb-4"
              placeholder="Nuevo Nombre"
            />
            <button
              onClick={handleNameChange}
              className="bg-brown text-white px-4 py-2 rounded-full hover:bg-brown-900 transition duration-200"
            >
              Confirmar
            </button>
            <button
              onClick={() => setShowNamePopup(false)}
              className="text-red-600 px-4 py-2 mt-2"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyProfile;
