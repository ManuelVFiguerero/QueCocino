const Receta = require('../models/Receta');
const Categoria = require('../models/Categoria');
const Usuario = require('../models/Usuario');
const Calificacion = require('../models/Calificacion');
const cloudinary = require('../config/cloudinaryConfig');

class RecetaController {
    async obtenerCategorias(req, res) {
        try {
            const categorias = await Categoria.find(); // Esto depende de cómo estés guardando las categorías
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
    
            // Validar campos requeridos
            if (!nombre || !instrucciones || !categorias || categorias.length === 0 || !imagen || !idCreador) {
                console.log("Error: Campos requeridos faltantes");
                return res.status(400).json({ 
                    error: 'Los campos "nombre", "instrucciones", "categorias" (al menos una), "imagen" e "idCreador" son obligatorios.' 
                });
            }
    
            // Función para remover tildes y caracteres especiales
            const sanitizeString = (str) => {
                return str
                    .normalize("NFD") // Descompone caracteres especiales
                    .replace(/[\u0300-\u036f]/g, "") // Elimina las marcas diacríticas (tildes, etc.)
                    .replace(/[^a-z\s]/gi, '') // Elimina cualquier carácter que no sea una letra o espacio
                    .toLowerCase()
                    .trim();
            };
    
            // Transformar y sanitizar los ingredientes
            const ingredientesValidados = Array.isArray(ingredientes)
                ? ingredientes.map(ingrediente => sanitizeString(ingrediente))
                : [sanitizeString(ingredientes)];
    
            // Crear la receta con los datos validados, usando nombres de categorías
            const nuevaReceta = new Receta({
                nombre,
                instrucciones,
                categorias, // Guardar nombres de las categorías directamente
                imagen: Array.isArray(imagen) ? imagen : [imagen],
                ingredientes: ingredientesValidados,
                idCreador
            });
    
            await nuevaReceta.save();
            console.log("Receta creada exitosamente:", nuevaReceta);
    
            // Agregar la receta a las recetasPropias del usuario
            await Usuario.findByIdAndUpdate(idCreador, {
                $push: { recetasPropias: nuevaReceta._id }
            });
    
            res.status(201).json(nuevaReceta);
        } catch (error) {
            console.log("Error al crear la receta:", error.message);
            res.status(400).json({ error: error.message });
        }
    }    
    
    async buscarPorFiltros(req, res) {
        try {
            const { categorias = [], ingredientes = [], idCreador } = req.body;
            console.log("Datos recibidos para buscar recetas:", { categorias, ingredientes, idCreador });

            // Obtener IDs de categorías seleccionadas
            let categoriaIds = [];
            if (categorias.length > 0) {
                const categoriasEncontradas = await Categoria.find({ nombre: { $in: categorias } });
                categoriaIds = categoriasEncontradas.map(categoria => categoria._id);
                console.log("Categorías seleccionadas (IDs):", categoriaIds);
            }

            // Transformar los ingredientes a minúsculas y sanitizar
            const ingredientesTransformados = ingredientes.map(ing => 
                ing.toLowerCase().replace(/[^a-záéíóúüñ\s]/g, '').trim()
            );
            console.log("Ingredientes transformados:", ingredientesTransformados);

            // Construir el filtro dinámico
            let filtro = {};

            if (categoriaIds.length > 0) {
                filtro.categorias = { $in: categoriaIds };
            }

            if (ingredientesTransformados.length > 0) {
                filtro.ingredientes = { $all: ingredientesTransformados };
            }

            if (idCreador) {
                filtro.idCreador = idCreador;
            }

            console.log("Filtro aplicado:", filtro);

            // Buscar recetas aplicando el filtro
            const recetas = await Receta.find(filtro)
                .populate("categorias", "nombre")
                .populate("ingredientes"); // Sin cantidad

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
    
            // Buscar la receta por ID
            const receta = await Receta.findById(idReceta);
    
            if (!receta) {
                return res.status(404).json({ error: 'Receta no encontrada' });
            }
    
            // Eliminar la receta de la colección de recetas
            await Receta.findByIdAndDelete(idReceta);
    
            // Eliminar todas las calificaciones asociadas a la receta
            await Calificacion.deleteMany({ idReceta: idReceta });
            console.log(`Calificaciones de la receta ${idReceta} eliminadas`);
    
            // Eliminar la receta de recetasPropias del usuario creador
            await Usuario.findByIdAndUpdate(receta.idCreador, {
                $pull: { recetasPropias: idReceta }
            });
            console.log(`Receta removida de recetasPropias del usuario ${receta.idCreador}`);
    
            // Eliminar la receta de recetasFavoritas de todos los usuarios
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
