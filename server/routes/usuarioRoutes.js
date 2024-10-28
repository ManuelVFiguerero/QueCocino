// routes/usuarioRoutes.js
const express = require('express');
const { registrarUsuario, iniciarSesion, editarUsuario } = require('../controllers/usuarioController');

const router = express.Router();

// Ruta para registrar un usuario
router.post('/registrar', registrarUsuario);

// Ruta para iniciar sesión de un usuario
router.post('/iniciarSesion', iniciarSesion);

// Ruta para editar un usuario (se usa su ID)
router.put('/editar/:id', editarUsuario);

module.exports = router;
