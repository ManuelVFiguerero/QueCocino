const express = require('express');
const router = express.Router();
const IngredienteController = require('../controllers/IngredienteController');

router.post('/agregar-nuevo', IngredienteController.agregarIngredienteNuevo);
router.post('/agregar-usuario', IngredienteController.agregarIngredienteUsuario);
router.put('/editar-cantidad', IngredienteController.editarCantidadReceta);

module.exports = router;
