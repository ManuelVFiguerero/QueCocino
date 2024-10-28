const Ingrediente = require('../models/Ingrediente');

class IngredienteController {
    async agregarIngredienteNuevo(req, res) {
        try {
            const nuevoIngrediente = new Ingrediente(req.body);
            await nuevoIngrediente.save();
            res.status(201).json(nuevoIngrediente);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async agregarIngredienteUsuario(req, res) {
        try {
            const { idUsuario, ingrediente } = req.body;
            // Implementación de lógica para agregar ingrediente a la lista del usuario
            res.status(200).json({ message: 'Ingrediente agregado al usuario' });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async editarCantidadReceta(req, res) {
        try {
            const { idIngrediente, cantidad } = req.body;
            const ingredienteActualizado = await Ingrediente.findByIdAndUpdate(idIngrediente, { cantidad }, { new: true });
            res.status(200).json(ingredienteActualizado);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}

module.exports = new IngredienteController();
