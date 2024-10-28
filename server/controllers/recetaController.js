const Receta = require('../models/Receta');

class RecetaController {
    async buscarPorIngredientes(req, res) {
        try {
            const { ingredientes } = req.body;
            const recetas = await Receta.find({ ingredientes: { $all: ingredientes } });
            res.status(200).json(recetas);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async buscarPorCategoria(req, res) {
        try {
            const { categoria } = req.body;
            const recetas = await Receta.find({ categorias: categoria });
            res.status(200).json(recetas);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async agregarReceta(req, res) {
        try {
            const nuevaReceta = new Receta(req.body);
            await nuevaReceta.save();
            res.status(201).json(nuevaReceta);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async eliminarReceta(req, res) {
        try {
            const { idReceta } = req.params;
            await Receta.findByIdAndDelete(idReceta);
            res.status(200).json({ message: 'Receta eliminada correctamente' });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async agregarRecetaFavorita(req, res) {
        try {
            const { idUsuario, idReceta } = req.body;
            // Implementación de lógica para agregar receta a favoritos del usuario
            res.status(200).json({ message: 'Receta agregada a favoritos' });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}

module.exports = new RecetaController();
