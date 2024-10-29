const Receta = require('../models/Receta');
const Categoria = require('../models/Categoria');

class RecetaController {
    async agregarReceta(req, res) {
        try {
            const { nombre, instrucciones, categorias, imagen, ingredientes } = req.body;

            // Verificar que los campos requeridos estén presentes
            if (!nombre || !instrucciones || !categorias || categorias.length === 0 || !imagen) {
                console.log("Error: Campos requeridos faltantes");
                return res.status(400).json({ 
                    error: 'Los campos "nombre", "instrucciones", "categorias" (al menos una) y "imagen" son obligatorios.' 
                });
            }

            // Validar y transformar los ingredientes a minúsculas
            const ingredientesValidados = ingredientes.map((ingrediente) => {
                const nombreLimpio = ingrediente.nombre.toLowerCase().replace(/[^a-záéíóúüñ\s]/g, '');
                const cantidad = ingrediente.cantidad;

                if (!nombreLimpio || typeof cantidad !== 'number') {
                    throw new Error(`Ingrediente inválido: ${JSON.stringify(ingrediente)}`);
                }

                return { nombre: nombreLimpio.trim(), cantidad };
            });

            // Buscar categorías en base a los nombres seleccionados
            const categoriasEncontradas = await Categoria.find({
                nombre: { $in: categorias }
            });

            // Verificar que todas las categorías solicitadas existen en la base de datos
            if (categoriasEncontradas.length !== categorias.length) {
                console.log("Error: Algunas categorías no existen en la base de datos");
                return res.status(400).json({ error: 'Una o más categorías seleccionadas no son válidas.' });
            }

            // Crear la receta con las categorías y los ingredientes transformados
            const nuevaReceta = new Receta({
                nombre,
                instrucciones,
                categorias: categoriasEncontradas.map(categoria => categoria._id), // Guardar solo los IDs de categorías
                imagen,
                ingredientes: ingredientesValidados
            });

            await nuevaReceta.save();
            console.log("Receta creada exitosamente:", nuevaReceta);
            res.status(201).json(nuevaReceta);
        } catch (error) {
            console.log("Error al crear la receta:", error.message);
            res.status(400).json({ error: error.message });
        }
    }

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
