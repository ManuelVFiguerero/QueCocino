const Calificacion = require('../models/Calificacion');
const Receta = require('../models/Receta');

class CalificacionController {
    async agregarCalificacion(req, res) {
        try {
            const { idReceta } = req.params;
            const { valor, idUsuario, comentario } = req.body;

            console.log("Inicio de agregar calificación:", { idReceta, valor, idUsuario, comentario });

            const nuevaCalificacion = new Calificacion({
                valor,
                idUsuario,
                idReceta,
                comentario
            });

            await nuevaCalificacion.save();

            await Receta.findByIdAndUpdate(idReceta, { $push: { calificaciones: nuevaCalificacion._id } });
            console.log(`Calificación añadida a la receta con ID ${idReceta}`);

            await CalificacionController.actualizarPromedioCalificacion(idReceta);

            res.status(201).json(nuevaCalificacion);
        } catch (error) {
            console.log("Error al agregar calificación:", error.message);
            res.status(400).json({ error: error.message });
        }
    }

    async eliminarCalificacion(req, res) {
        try {
            const { idCalificacion } = req.params;

            const calificacion = await Calificacion.findById(idCalificacion);
            if (!calificacion) {
                return res.status(404).json({ error: 'Calificación no encontrada' });
            }

            const idReceta = calificacion.idReceta;

            await Receta.findByIdAndUpdate(idReceta, { $pull: { calificaciones: idCalificacion } });

            await Calificacion.findByIdAndDelete(idCalificacion);

            await CalificacionController.actualizarPromedioCalificacion(idReceta);

            res.status(200).json({ message: 'Calificación eliminada correctamente' });
        } catch (error) {
            console.log("Error al eliminar calificación:", error.message);
            res.status(400).json({ error: error.message });
        }
    }

    static async actualizarPromedioCalificacion(idReceta) {
        try {
            console.log(`Inicio de actualización de promedio para la receta con ID ${idReceta}`);

            const receta = await Receta.findById(idReceta).populate('calificaciones');
            if (!receta) {
                throw new Error('Receta no encontrada');
            }

            const totalCalificaciones = receta.calificaciones.length;

            const sumaCalificaciones = receta.calificaciones.reduce((sum, calificacion) => sum + calificacion.valor, 0);

            const promedio = totalCalificaciones > 0 ? (sumaCalificaciones / totalCalificaciones).toFixed(1) : 0;

            await Receta.findByIdAndUpdate(idReceta, { promedioCalificacion: parseFloat(promedio) });
            console.log(`Promedio actualizado en la receta con ID ${idReceta}: ${promedio}`);
        } catch (error) {
            console.log("Error al actualizar el promedio de calificación:", error.message);
        }
    }
}

module.exports = new CalificacionController();
