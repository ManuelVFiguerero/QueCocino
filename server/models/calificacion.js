const mongoose = require('mongoose');
const { Schema } = mongoose;

const calificacionSchema = new Schema({
    valor: { 
        type: Number, 
        required: true, 
        min: 1, 
        max: 5,
        validate: {
            validator: (v) => Number.isInteger(v * 2), // Permite valores enteros y medias (e.g., 1.5, 2.5)
            message: (props) => `${props.value} no es una calificación válida. Debe ser un número entre 1 y 5, permitiendo medias.`
        }
    },
    idUsuario: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true },
    idReceta: { type: Schema.Types.ObjectId, ref: 'Receta', required: true },
    comentario: { type: String, default: '' } // Campo opcional para el comentario
}, { timestamps: true });

module.exports = mongoose.models.Calificacion || mongoose.model('Calificacion', calificacionSchema);
