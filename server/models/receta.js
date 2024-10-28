const mongoose = require('mongoose');
const { Schema } = mongoose;

const recetaSchema = new Schema({
    nombre: { type: String, required: true },
    ingredientes: [{ type: Schema.Types.ObjectId, ref: 'Ingrediente' }],
    categorias: [{ type: Schema.Types.ObjectId, ref: 'Categoria' }],
    comentarios: [{ type: Schema.Types.ObjectId, ref: 'Comentario' }],
    calificaciones: [{ type: Schema.Types.ObjectId, ref: 'Calificacion' }]
}, { timestamps: true });

module.exports = mongoose.models.Receta || mongoose.model('Receta', recetaSchema);
