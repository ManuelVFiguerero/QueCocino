const mongoose = require('mongoose');
const { Schema } = mongoose;

const recetaSchema = new Schema({
    nombre: { type: String, required: true },
    ingredientes: [
        {
            nombre: { type: String, required: true },
            cantidad: { type: Number, required: true }
        }
    ],
    categorias: [{ type: Schema.Types.ObjectId, ref: 'Categoria', required: true }], // Al menos 1 categoría
    comentarios: [{ type: Schema.Types.ObjectId, ref: 'Comentario' }],
    calificaciones: [{ type: Schema.Types.ObjectId, ref: 'Calificacion' }],
    instrucciones: { type: String, required: true }, // Instrucciones obligatorias
    imagen: { type: String, required: true } // Imagen obligatoria
}, { timestamps: true });

module.exports = mongoose.models.Receta || mongoose.model('Receta', recetaSchema);
