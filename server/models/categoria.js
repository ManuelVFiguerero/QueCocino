const mongoose = require('mongoose');
const { Schema } = mongoose;

const categoriaSchema = new Schema({
    nombre: { type: String, required: true },
    tipoCategoria: { type: String, enum: ['Cultura', 'Restriccion', 'Tipo'], required: true }
}, { timestamps: true });

module.exports = mongoose.models.Categoria || mongoose.model('Categoria', categoriaSchema);
