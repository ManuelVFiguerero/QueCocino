const express = require('express');
const router = express.Router();
const RecetaController = require('../controllers/RecetaController');

router.post('/buscar-ingredientes', RecetaController.buscarPorIngredientes);
router.post('/buscar-categoria', RecetaController.buscarPorCategoria);
router.post('/agregar', RecetaController.agregarReceta);
router.delete('/eliminar/:idReceta', RecetaController.eliminarReceta);
router.post('/agregar-favorita', RecetaController.agregarRecetaFavorita);

module.exports = router;
