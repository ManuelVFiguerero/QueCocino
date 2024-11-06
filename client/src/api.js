import axios from 'axios';

const API_URL = 'http://localhost:5002/api';

// Configurar token de autenticación en el encabezado de cada solicitud
export const setAuthToken = token => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};

// Iniciar sesión
export const iniciarSesion = async (email, contrasena) => {
  try {
    const response = await axios.post(`${API_URL}/usuarios/iniciar-sesion`, { email, contrasena });
    return response.data;
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    throw error;
  }
};

// Registrar un nuevo usuario
export const registrarUsuario = async (usuarioData) => {
  try {
    const response = await axios.post(`${API_URL}/usuarios/registrar`, usuarioData);
    return response.data;
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    throw error;
  }
};

// Agregar una receta a favoritos
export const agregarAFavoritos = async (idUsuario, idReceta) => {
  try {
    const response = await axios.post(`${API_URL}/usuarios/favoritos`, { idUsuario, idReceta });
    return response.data;
  } catch (error) {
    console.error('Error al agregar receta a favoritos:', error);
    throw error;
  }
};

export const agregarCalificacion = async (idUsuario, idReceta, valor, comentario) => {
  try {
    const response = await axios.post(`${API_URL}/calificaciones/agregar/${idReceta}`, {
      idUsuario,
      valor,
      comentario,
    });
    return response.data;
  } catch (error) {
    console.error('Error al agregar calificación:', error);
    throw error;
  }
};

export const agregarReceta = async (formData) => {
  try {
    const response = await axios.post(`${API_URL}/recetas/agregar`, formData);
    return response.data;
  } catch (error) {
    console.error('Error al agregar receta:', error);
    throw error;
  }
};

// Obtener todas las categorías
export const obtenerCategorias = async () => {
  try {
    const response = await axios.get(`${API_URL}/recetas/categorias`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener categorías:', error);
    throw error;
  }
};

export default {
  iniciarSesion,
  registrarUsuario,
  agregarAFavoritos,
  agregarCalificacion,
  agregarReceta,
  obtenerCategorias, // Exportar la función para obtener categorías
};