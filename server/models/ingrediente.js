const mongoose = require('mongoose');
const { Schema } = mongoose;

const ingredienteSchema = new Schema({
    nombre: { type: String, required: true },
    cantidad: { type: Number, required: true },
    id: { type: Schema.Types.ObjectId, default: () => new mongoose.Types.ObjectId() }
});

module.exports = mongoose.model('Ingrediente', ingredienteSchema);
