const express = require('express');
const cors = require('cors'); 
const connectDB = require('./config/db');
const usuarioRoutes = require('./routes/usuarioRoutes');
const recetaRoutes = require('./routes/recetaRoutes');
const calificacionRoutes = require('./routes/calificacionRoutes');

require('dotenv').config();

const app = express();
connectDB();

app.use(cors());
app.use(express.json()); 

app.use('/api/usuarios', usuarioRoutes);
app.use('/api/recetas', recetaRoutes);
app.use('/api/calificaciones', calificacionRoutes);

const PORT = process.env.PORT || 5002;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
