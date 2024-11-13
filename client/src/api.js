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

// Buscar recetas por filtros
export const buscarRecetas = async (ingredientes, categorias) => {
  try {
    const response = await axios.post(`${API_URL}/recetas/buscar`, {
      ingredientes,
      categorias,
    });
    return response.data;
  } catch (error) {
    console.error('Error al buscar recetas:', error);
    throw error;
  }
};

// Obtener información de usuario
export const obtenerUsuario = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/usuarios/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener información del usuario:', error);
    throw error;
  }
};

// Editar usuario
export const editarUsuario = async (userId, data) => {
  try {
    const response = await axios.put(`${API_URL}/usuarios/editar/${userId}`, data);
    return response.data;
  } catch (error) {
    console.error('Error al editar el usuario:', error);
    throw error;
  }
};

// Eliminar usuario
export const eliminarUsuario = async (userId) => {
  try {
    const response = await axios.delete(`${API_URL}/usuarios/eliminar/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error al eliminar el usuario:', error);
    throw error;
  }
};

// Obtener recetas favoritas del usuario
export const obtenerRecetasFavoritas = async (idUsuario) => {
  try {
    const response = await axios.get(`${API_URL}/usuarios/${idUsuario}/favoritos`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener recetas favoritas:', error);
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

// Obtener una receta por su ID
export const obtenerRecetaPorId = async (idReceta) => {
  try {
    const response = await axios.get(`${API_URL}/recetas/${idReceta}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener receta:', error);
    throw error;
  }
};

export const eliminarDeFavoritos = async (idUsuario, idReceta) => {
  try {
    const response = await axios.delete(`${API_URL}/usuarios/favoritos/${idReceta}`, {
      data: { idUsuario }
    });
    return response.data;
  } catch (error) {
    console.error('Error al eliminar receta de favoritos:', error);
    throw error;
  }
};

// Eliminar receta
export const eliminarReceta = async (idReceta) => {
  try {
    const response = await axios.delete(`${API_URL}/recetas/eliminar/${idReceta}`);
    return response.data;
  } catch (error) {
    console.error('Error al eliminar receta:', error);
    throw error;
  }
};

// Función para agregar una calificación
export const agregarCalificacion = async (idUsuario, idReceta, valor, comentario = null) => {
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

export default {
  iniciarSesion,
  registrarUsuario,
  agregarAFavoritos,
  agregarReceta,
  obtenerCategorias,
  buscarRecetas,
  obtenerUsuario,
  editarUsuario,
  eliminarUsuario,
  obtenerRecetasFavoritas,
  agregarAFavoritos,
  obtenerRecetaPorId,
  eliminarDeFavoritos,
  eliminarReceta,
  agregarCalificacion,
};
