const Receta = require('../models/Receta');
const Categoria = require('../models/Categoria');
const Usuario = require('../models/Usuario');

class RecetaController {
    async agregarReceta(req, res) {
        try {
            const { nombre, instrucciones, categorias, imagen, ingredientes, idCreador } = req.body;
            console.log("Datos recibidos para crear receta:", req.body);

            // Validar campos requeridos
            if (!nombre || !instrucciones || !categorias || categorias.length === 0 || !imagen || !idCreador) {
                console.log("Error: Campos requeridos faltantes");
                return res.status(400).json({ 
                    error: 'Los campos "nombre", "instrucciones", "categorias" (al menos una), "imagen" e "idCreador" son obligatorios.' 
                });
            }

            // Validar y transformar los ingredientes
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

            console.log("Categorías encontradas:", categoriasEncontradas);

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
                ingredientes: ingredientesValidados,
                idCreador
            });

            await nuevaReceta.save();
            console.log("Receta creada exitosamente:", nuevaReceta);

            // Agregar la receta a las recetasPropias del usuario
            await Usuario.findByIdAndUpdate(idCreador, {
                $push: { recetasPropias: nuevaReceta._id }
            });

            console.log(`Receta agregada a recetasPropias del usuario con ID: ${idCreador}`);
            res.status(201).json(nuevaReceta);
        } catch (error) {
            console.log("Error al crear la receta:", error.message);
            res.status(400).json({ error: error.message });
        }
    }

    async buscarPorFiltros(req, res) {
        try {
            const { categorias = [], ingredientes = [], idCreador } = req.body; // Asigna valores predeterminados si no se envían

            console.log("Datos recibidos para buscar recetas:", { categorias, ingredientes, idCreador });

            // Paso 1: Si se envían categorías, obtenemos sus IDs.
            let categoriaIds = [];
            if (categorias.length > 0) {
                const categoriasEncontradas = await Categoria.find({ nombre: { $in: categorias } });
                categoriaIds = categoriasEncontradas.map(categoria => categoria._id);
                console.log("Categorías seleccionadas (IDs):", categoriaIds);
            }

            // Paso 2: Transformar los ingredientes a minúsculas y eliminar caracteres inválidos
            const ingredientesTransformados = ingredientes.map(ing => 
                ing.toLowerCase().replace(/[^a-záéíóúüñ\s]/g, '').trim()
            );
            console.log("Ingredientes transformados:", ingredientesTransformados);

            // Paso 3: Construir el filtro dinámico
            let filtro = {};

            if (categoriaIds.length > 0) {
                filtro.categorias = { $in: categoriaIds };
            }

            if (ingredientesTransformados.length > 0) {
                filtro["ingredientes.nombre"] = { $all: ingredientesTransformados };
            }

            if (idCreador) {
                filtro.idCreador = idCreador;
            }

            console.log("Filtro aplicado:", filtro);

            // Paso 4: Buscar recetas con el filtro, o todas las recetas si el filtro está vacío
            const recetas = await Receta.find(filtro)
                .populate("categorias", "nombre") // Muestra solo el nombre de las categorías
                .populate("ingredientes.nombre ingredientes.cantidad"); // Muestra nombre y cantidad de los ingredientes

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

            // Eliminar la receta de recetasPropias del usuario creador
            await Usuario.findByIdAndUpdate(receta.idCreador, {
                $pull: { recetasPropias: idReceta }
            });

            console.log(`Receta con ID ${idReceta} eliminada exitosamente y removida de recetasPropias del usuario ${receta.idCreador}`);
            res.status(200).json({ message: 'Receta eliminada correctamente' });
        } catch (error) {
            console.log("Error al eliminar la receta:", error.message);
            res.status(400).json({ error: error.message });
        }
    }
}

module.exports = new RecetaController();
