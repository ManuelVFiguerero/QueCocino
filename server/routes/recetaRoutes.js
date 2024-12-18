const express = require('express');
const router = express.Router();
const RecetaController = require('../controllers/RecetaController');
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.get('/categorias', RecetaController.obtenerCategorias);
router.post('/buscar', RecetaController.buscarPorFiltros);
router.post('/agregar', upload.array('imagen', 3), RecetaController.agregarReceta); 
router.delete('/eliminar/:idReceta', RecetaController.eliminarReceta);
router.get('/:idReceta', RecetaController.obtenerRecetaPorId);

module.exports = router;