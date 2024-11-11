const Usuario = require('../models/Usuario');
const Receta = require('../models/Receta');
const Calificacion = require('../models/Calificacion');
const bcrypt = require('bcryptjs');

class UsuarioController {
    async registrarUsuario(req, res) {
        try {
            console.log("Datos recibidos:", req.body);
            const { nombre, apellido, email, contrasena, confirmarContrasena } = req.body;
    
            if (contrasena !== confirmarContrasena) {
                console.log("Error: Las contraseñas no coinciden");
                return res.status(400).json({ error: 'Las contraseñas no coinciden' });
            }
    
            const usuarioExistente = await Usuario.findOne({ email });
            if (usuarioExistente) {
                console.log("Error: El usuario ya existe");
                return res.status(400).json({ error: 'El usuario ya existe' });
            }
    
            const hashedPassword = await bcrypt.hash(contrasena, 10);
    
            const nuevoUsuario = new Usuario({
                nombre,
                apellido,
                email,
                contrasena: hashedPassword
            });
    
            await nuevoUsuario.save();
            console.log("Usuario registrado exitosamente:", nuevoUsuario);
            res.status(201).json({ message: 'Usuario registrado exitosamente', usuario: nuevoUsuario });
        } catch (error) {
            console.log("Error en el registro de usuario:", error.message);
            res.status(500).json({ error: error.message });
        }
    }

    async iniciarSesion(req, res) {
        try {
            console.log("Datos recibidos para inicio de sesión:", req.body);
            const { email, contrasena } = req.body;
            const usuario = await Usuario.findOne({ email });
    
            if (!usuario) {
                console.log("Error: El email proporcionado no está registrado.");
                return res.status(401).json({ error: 'El email proporcionado no está registrado' });
            }
    
            const contrasenaValida = await bcrypt.compare(contrasena, usuario.contrasena);
            if (!contrasenaValida) {
                console.log("Error: La contraseña es incorrecta.");
                return res.status(401).json({ error: 'La contraseña es incorrecta' });
            }
    
            console.log("Inicio de sesión exitoso para el usuario:", usuario.email);
    
            // Devuelve también el `userID` en la respuesta
            res.status(200).json({ 
                message: 'Inicio de sesión exitoso', 
                usuario: { _id: usuario._id, email: usuario.email }, // Asegúrate de incluir el `userID` 
                token: "token_generado_aqui" // Incluye un token si es necesario
            });
        } catch (error) {
            console.log("Error en el inicio de sesión:", error.message);
            res.status(500).json({ error: error.message });
        }
    }    

    async editarUsuario(req, res) {
        try {
            const { idUsuario } = req.params;
            const { email, contrasena, restricciones } = req.body;
            const actualizaciones = {};

            if (email) {
                actualizaciones.email = email;
            }

            if (contrasena) {
                const hashedPassword = await bcrypt.hash(contrasena, 10);
                actualizaciones.contrasena = hashedPassword;
            }

            if (restricciones) {
                actualizaciones.restricciones = restricciones.map(restriccion => 
                    restriccion.toLowerCase().replace(/[^a-záéíóúüñ\s]/g, '').trim()
                );
            }

            const usuarioActualizado = await Usuario.findByIdAndUpdate(idUsuario, actualizaciones, { new: true });

            if (!usuarioActualizado) {
                return res.status(404).json({ error: 'Usuario no encontrado' });
            }

            console.log("Usuario actualizado exitosamente:", usuarioActualizado);
            res.status(200).json(usuarioActualizado);
        } catch (error) {
            console.log("Error al actualizar usuario:", error.message);
            res.status(400).json({ error: error.message });
        }
    }

    // Método para agregar receta a favoritos
    async agregarAFavoritos(req, res) {
        try {
            const { idUsuario, idReceta } = req.body;
            console.log(`Agregar receta ${idReceta} a favoritos del usuario ${idUsuario}`);

            const usuarioActualizado = await Usuario.findByIdAndUpdate(
                idUsuario,
                { $addToSet: { recetasFavoritas: idReceta } },
                { new: true }
            );

            if (!usuarioActualizado) {
                console.log("Error: Usuario no encontrado");
                return res.status(404).json({ error: 'Usuario no encontrado' });
            }

            console.log("Receta agregada a favoritos exitosamente:", usuarioActualizado);
            res.status(200).json({ message: 'Receta agregada a favoritos', usuario: usuarioActualizado });
        } catch (error) {
            console.log("Error al agregar receta a favoritos:", error.message);
            res.status(500).json({ error: error.message });
        }
    }

    async eliminarDeFavoritos(req, res) {
        try {
            const { idUsuario } = req.body;
            const { idReceta } = req.params;
            console.log(`Eliminar receta ${idReceta} de favoritos del usuario ${idUsuario}`);
    
            const usuarioActualizado = await Usuario.findByIdAndUpdate(
                idUsuario,
                { $pull: { recetasFavoritas: idReceta } },
                { new: true }
            );
    
            if (!usuarioActualizado) {
                console.log("Error: Usuario no encontrado");
                return res.status(404).json({ error: 'Usuario no encontrado' });
            }
    
            console.log("Receta eliminada de favoritos exitosamente:", usuarioActualizado);
            res.status(200).json({ message: 'Receta eliminada de favoritos', usuario: usuarioActualizado });
        } catch (error) {
            console.log("Error al eliminar receta de favoritos:", error.message);
            res.status(500).json({ error: error.message });
        }
    }

    async eliminarUsuario(req, res) {
        try {
            const { idUsuario } = req.params;
    
            // Buscar el usuario antes de eliminarlo para obtener sus recetasPropias
            const usuario = await Usuario.findById(idUsuario);
            if (!usuario) {
                return res.status(404).json({ error: 'Usuario no encontrado' });
            }
    
            // Eliminar las recetas y sus calificaciones, y remover de favoritos de otros usuarios
            for (const recetaId of usuario.recetasPropias) {
                // Eliminar las calificaciones vinculadas a la receta
                await Calificacion.deleteMany({ idReceta: recetaId });
    
                // Eliminar la receta de la lista de favoritos de otros usuarios
                await Usuario.updateMany(
                    { recetasFavoritas: recetaId },
                    { $pull: { recetasFavoritas: recetaId } }
                );
    
                // Eliminar la receta
                await Receta.findByIdAndDelete(recetaId);
            }
    
            // Eliminar el usuario después de eliminar sus recetas y calificaciones
            await Usuario.findByIdAndDelete(idUsuario);
    
            console.log(`Usuario con ID ${idUsuario}, sus recetas, calificaciones asociadas, y referencias en favoritos han sido eliminados.`);
            res.status(200).json({ message: 'Usuario y sus datos asociados eliminados correctamente' });
        } catch (error) {
            console.log("Error al eliminar usuario y sus datos:", error.message);
            res.status(500).json({ error: error.message });
        }
    }    
}

module.exports = new UsuarioController();
