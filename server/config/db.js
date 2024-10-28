// config/db.js
const mongoose = require('mongoose');
require('dotenv').config(); // Cargar variables del archivo .env

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB conectado: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error conectando a MongoDB: ${error.message}`);
    process.exit(1); // Detener la aplicación si hay un error
  }
};

module.exports = connectDB;
