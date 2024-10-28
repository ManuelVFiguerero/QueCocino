const express = require('express');
const router = express.Router();
const ComentarioController = require('../controllers/ComentarioController');

router.post('/agregar', ComentarioController.agregarComentario);
router.delete('/eliminar/:idComentario', ComentarioController.eliminarComentario);

module.exports = router;
