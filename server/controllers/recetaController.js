const Receta = require('../models/Receta');
const Categoria = require('../models/Categoria');
const Usuario = require('../models/Usuario');
const Calificacion = require('../models/Calificacion');
const cloudinary = require('../config/cloudinaryConfig');

class RecetaController {
    async obtenerCategorias(req, res) {
        try {
            const categorias = await Categoria.find(); 
            res.status(200).json(categorias);
        } catch (error) {
            console.error("Error al obtener categorías:", error);
            res.status(500).json({ error: 'Error al obtener categorías' });
        }
    }
    
    async agregarReceta(req, res) {
        try {
            const { nombre, instrucciones, categorias, ingredientes, idCreador, imagen } = req.body;
    
            console.log("Datos recibidos para crear receta:", req.body);
    
            if (!nombre || !instrucciones || !categorias || categorias.length === 0 || !imagen || !idCreador) {
                console.log("Error: Campos requeridos faltantes");
                return res.status(400).json({ 
                    error: 'Los campos "nombre", "instrucciones", "categorias" (al menos una), "imagen" e "idCreador" son obligatorios.' 
                });
            }
    
            const sanitizeString = (str) => {
                return str
                    .normalize("NFD") 
                    .replace(/[\u0300-\u036f]/g, "") 
                    .replace(/[^a-z\s]/gi, '') 
                    .toLowerCase()
                    .trim();
            };
    
            const ingredientesValidados = Array.isArray(ingredientes)
                ? ingredientes.map(ingrediente => sanitizeString(ingrediente))
                : [sanitizeString(ingredientes)];
    
            const nuevaReceta = new Receta({
                nombre,
                instrucciones,
                categorias, 
                imagen: Array.isArray(imagen) ? imagen : [imagen],
                ingredientes: ingredientesValidados,
                idCreador
            });
    
            await nuevaReceta.save();
            console.log("Receta creada exitosamente:", nuevaReceta);
    
            await Usuario.findByIdAndUpdate(idCreador, {
                $push: { recetasPropias: nuevaReceta._id }
            });
    
            res.status(201).json(nuevaReceta);
        } catch (error) {
            console.log("Error al crear la receta:", error.message);
            res.status(400).json({ error: error.message });
        }
    }
    
    async obtenerRecetaPorId(req, res) {
        try {
            const { idReceta } = req.params;
            const receta = await Receta.findById(idReceta)
                .populate('categorias', 'nombre')  
                .populate('ingredientes');  

            if (!receta) {
                return res.status(404).json({ error: 'Receta no encontrada' });
            }

            res.status(200).json(receta);
        } catch (error) {
            console.error("Error al obtener la receta:", error.message);
            res.status(500).json({ error: error.message });
        }
    }
    
    async buscarPorFiltros(req, res) {
        try {
            const { categorias = [], ingredientes = [], idCreador } = req.body;
            console.log("Datos recibidos para buscar recetas:", { categorias, ingredientes, idCreador });
    
            let filtro = {};
    
            if (categorias.length > 0) {
                filtro.categorias = { $all: categorias }; 
            }
    
            const ingredientesTransformados = ingredientes.map(ing => 
                ing.toLowerCase().replace(/[^a-záéíóúüñ\s]/g, '').trim()
            );
            console.log("Ingredientes transformados:", ingredientesTransformados);
    
            if (ingredientesTransformados.length > 0) {
                filtro.ingredientes = { $all: ingredientesTransformados };
            }
    
            if (idCreador) {
                filtro.idCreador = idCreador;
            }
    
            console.log("Filtro aplicado:", filtro);
    
            const recetas = await Receta.find(filtro)
                .populate("categorias", "nombre")
                .populate("ingredientes");
    
            console.log("Recetas encontradas:", recetas);
            res.status(200).json(recetas);
        } catch (error) {
            console.log("Error al buscar recetas:", error.message);
            res.status(400).json({ error: error.message });
        }
    }    

    async eliminarReceta(req, res) {
        try {
            const { idReceta } = req.params;
    
            const receta = await Receta.findById(idReceta);
    
            if (!receta) {
                return res.status(404).json({ error: 'Receta no encontrada' });
            }
    
            await Receta.findByIdAndDelete(idReceta);
    
            await Calificacion.deleteMany({ idReceta: idReceta });
            console.log(`Calificaciones de la receta ${idReceta} eliminadas`);
    
            await Usuario.findByIdAndUpdate(receta.idCreador, {
                $pull: { recetasPropias: idReceta }
            });
            console.log(`Receta removida de recetasPropias del usuario ${receta.idCreador}`);
    
            await Usuario.updateMany(
                { recetasFavoritas: idReceta },
                { $pull: { recetasFavoritas: idReceta } }
            );
            console.log(`Receta removida de recetasFavoritas de todos los usuarios`);
    
            res.status(200).json({ message: 'Receta y sus asociaciones eliminadas correctamente' });
        } catch (error) {
            console.log("Error al eliminar la receta:", error.message);
            res.status(400).json({ error: error.message });
        }
    }
}

module.exports = new RecetaController();
