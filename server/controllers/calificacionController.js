const Calificacion = require('../models/calificacion');

class CalificacionController {
    async agregarCalificacion(req, res) {
        try {
            const nuevaCalificacion = new Calificacion(req.body);
            await nuevaCalificacion.save();
            res.status(201).json(nuevaCalificacion);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async eliminarCalificacion(req, res) {
        try {
            const { idCalificacion } = req.params;
            await Calificacion.findByIdAndDelete(idCalificacion);
            res.status(200).json({ message: 'Calificación eliminada correctamente' });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}

module.exports = new CalificacionController();
