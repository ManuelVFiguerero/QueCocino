const mongoose = require('mongoose');
const { Schema } = mongoose;

const usuarioSchema = new Schema({
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    contrasena: { type: String, required: true },  
    restricciones: [{ type: String }], 
    recetasFavoritas: [{ type: Schema.Types.ObjectId, ref: 'Receta' }], 
    recetasPropias: [{ type: Schema.Types.ObjectId, ref: 'Receta' }], 
}, { timestamps: true });

module.exports = mongoose.models.Usuario || mongoose.model('Usuario', usuarioSchema);
