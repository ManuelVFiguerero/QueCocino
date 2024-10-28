const mongoose = require('mongoose');
const { Schema } = mongoose;

const calificacionSchema = new Schema({
    valor: { type: Number, required: true, min: 1, max: 5 },
    idUsuario: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true }
}, { timestamps: true });

module.exports = mongoose.models.Calificacion || mongoose.model('Calificacion', calificacionSchema);
