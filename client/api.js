import axios from 'axios';


// Configuración de la URL base

const API_URL = 'http://localhost:5002/api'; // Asegúrate de que este puerto coincide con el que usas en el backend


// Funciones para interactuar con el backend


// Obtener todos los usuarios

export const obtenerUsuarios = async () => {

  try {

    const response = await axios.get(`${API_URL}/usuarios`);

    return response.data;

  } catch (error) {

    console.error('Error al obtener usuarios:', error);

    throw error;

  }

};


// Crear un nuevo usuario

export const crearUsuario = async (usuarioData) => {

  try {

    const response = await axios.post(`${API_URL}/usuarios`, usuarioData);

    return response.data;

  } catch (error) {

    console.error('Error al crear usuario:', error);

    throw error;

  }

};


// Obtener todas las recetas

export const obtenerRecetas = async () => {

  try {

    const response = await axios.get(`${API_URL}/recetas`);

    return response.data;

  } catch (error) {

    console.error('Error al obtener recetas:', error);

    throw error;

  }

};


// Crear una nueva receta

export const crearReceta = async (recetaData) => {

  try {

    const response = await axios.post(`${API_URL}/recetas`, recetaData);

    return response.data;

  } catch (error) {

    console.error('Error al crear receta:', error);

    throw error;

  }

};


// Puedes agregar más funciones según sea necesario para los comentarios y calificaciones


export default {

  obtenerUsuarios,

  crearUsuario,

  obtenerRecetas,

  crearReceta,

};
