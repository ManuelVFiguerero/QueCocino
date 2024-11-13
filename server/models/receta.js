const mongoose = require('mongoose');
const { Schema } = mongoose;

const recetaSchema = new Schema({
    nombre: { type: String, required: true },
    ingredientes: [{ type: String, required: true }],
    categorias: [{ type: String, required: true }],
    calificaciones: [{ type: Schema.Types.ObjectId, ref: 'Calificacion' }],
    instrucciones: { type: String, required: true },
    imagen: [{ type: String, required: true }],
    idCreador: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true },
    promedioCalificacion: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.models.Receta || mongoose.model('Receta', recetaSchema);

