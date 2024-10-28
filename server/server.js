// server.js
const express = require('express');
const connectDB = require('./config/db');
const usuarioRoutes = require('./routes/usuarioRoutes');

require('dotenv').config();

const app = express();
connectDB(); // Conectar a MongoDB

app.use(express.json()); // Middleware para parsear JSON

// Rutas
app.use('/api/usuarios', usuarioRoutes);

const PORT = process.env.PORT || 5002;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

