const mongoose = require('mongoose');
const { Schema } = mongoose;

const comentarioSchema = new Schema({
    contenido: { type: String, required: true },
    idUsuario: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true }
}, { timestamps: true });

module.exports = mongoose.model('Comentario', comentarioSchema);
