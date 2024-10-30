const express = require('express');
const router = express.Router();
const RecetaController = require('../controllers/RecetaController');

router.post('/buscar', RecetaController.buscarPorFiltros);
router.post('/agregar', RecetaController.agregarReceta);
router.delete('/eliminar/:idReceta', RecetaController.eliminarReceta);

module.exports = router;
