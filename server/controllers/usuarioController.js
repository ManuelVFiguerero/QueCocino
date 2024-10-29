const Usuario = require('../models/Usuario');
const bcrypt = require('bcrypt');

class UsuarioController {
    async registrarUsuario(req, res) {
        try {
            console.log("Datos recibidos:", req.body); // Agregar este log para ver el contenido de la solicitud
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
    
            // Verificar si el email es correcto
            if (!usuario) {
                console.log("Error: El email proporcionado no está registrado.");
                return res.status(401).json({ error: 'El email proporcionado no está registrado' });
            }
    
            // Verificar si la contraseña es correcta
            const contrasenaValida = await bcrypt.compare(contrasena, usuario.contrasena);
            if (!contrasenaValida) {
                console.log("Error: La contraseña es incorrecta.");
                return res.status(401).json({ error: 'La contraseña es incorrecta' });
            }
    
            console.log("Inicio de sesión exitoso para el usuario:", usuario.email);
            res.status(200).json({ message: 'Inicio de sesión exitoso' });
        } catch (error) {
            console.log("Error en el inicio de sesión:", error.message);
            res.status(500).json({ error: error.message });
        }
    }     

    async editarUsuario(req, res) {
        try {
            const { idUsuario } = req.params;
            const usuarioActualizado = await Usuario.findByIdAndUpdate(idUsuario, req.body, { new: true });
            console.log("Usuario actualizado exitosamente:", usuarioActualizado);
            res.status(200).json(usuarioActualizado);
        } catch (error) {
            console.log("Error al actualizar usuario:", error.message);
            res.status(400).json({ error: error.message });
        }
    }
}

module.exports = new UsuarioController();
