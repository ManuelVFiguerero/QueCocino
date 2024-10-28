const express = require('express');
const router = express.Router();
const CalificacionController = require('../controllers/CalificacionController');

router.post('/agregar', CalificacionController.agregarCalificacion);
router.delete('/eliminar/:idCalificacion', CalificacionController.eliminarCalificacion);

module.exports = router;
