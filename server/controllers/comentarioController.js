const Comentario = require('../models/Comentario');

class ComentarioController {
    async agregarComentario(req, res) {
        try {
            const nuevoComentario = new Comentario(req.body);
            await nuevoComentario.save();
            res.status(201).json(nuevoComentario);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async eliminarComentario(req, res) {
        try {
            const { idComentario } = req.params;
            await Comentario.findByIdAndDelete(idComentario);
            res.status(200).json({ message: 'Comentario eliminado correctamente' });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}

module.exports = new ComentarioController();
