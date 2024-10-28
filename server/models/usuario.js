const mongoose = require('mongoose');
const { Schema } = mongoose;

const usuarioSchema = new Schema({
    nombre: { type: String, required: true },
    mail: { type: String, required: true, unique: true },
    fechaNacimiento: { type: Date, required: true },
    restricciones: [{ type: String }], // Enum podría ser definido a nivel de aplicación
    ingredientesDisponibles: [{ type: Schema.Types.ObjectId, ref: 'Ingrediente' }],
    recetasFavoritas: [{ type: Schema.Types.ObjectId, ref: 'Receta' }],
    recetasPropias: [{ type: Schema.Types.ObjectId, ref: 'Receta' }]
}, { timestamps: true });

module.exports = mongoose.model('Usuario', usuarioSchema);
