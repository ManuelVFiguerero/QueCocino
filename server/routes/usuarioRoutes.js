const express = require('express');
const router = express.Router();
const UsuarioController = require('../controllers/UsuarioController');

router.post('/registrar', UsuarioController.registrarUsuario);
router.post('/iniciar-sesion', UsuarioController.iniciarSesion);
router.put('/editar/:idUsuario', UsuarioController.editarUsuario);
router.post('/favoritos', UsuarioController.agregarAFavoritos);

module.exports = router;