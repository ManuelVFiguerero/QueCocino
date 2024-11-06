// server.js
const express = require('express');
const cors = require('cors'); // Importar CORS
const connectDB = require('./config/db');
const usuarioRoutes = require('./routes/usuarioRoutes');
const recetaRoutes = require('./routes/recetaRoutes');
const calificacionRoutes = require('./routes/calificacionRoutes');

require('dotenv').config();

const app = express();
connectDB(); // Conectar a MongoDB

app.use(cors()); // Habilitar CORS para todas las solicitudes
app.use(express.json()); // Middleware para parsear JSON

// Rutas
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/recetas', recetaRoutes);
app.use('/api/calificaciones', calificacionRoutes);

const PORT = process.env.PORT || 5002;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
