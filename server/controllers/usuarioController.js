const Usuario = require('../models/usuario');

class UsuarioController {
    async registrarUsuario(req, res) {
        try {
            const nuevoUsuario = new Usuario(req.body);
            await nuevoUsuario.save();
            res.status(201).json(nuevoUsuario);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async iniciarSesion(req, res) {
        try {
            const { mail, password } = req.body;
            const usuario = await Usuario.findOne({ mail });
            if (!usuario || usuario.password !== password) {
                return res.status(401).json({ error: 'Credenciales inválidas' });
            }
            res.status(200).json({ message: 'Inicio de sesión exitoso' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async editarUsuario(req, res) {
        try {
            const { idUsuario } = req.params;
            const usuarioActualizado = await Usuario.findByIdAndUpdate(idUsuario, req.body, { new: true });
            res.status(200).json(usuarioActualizado);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}

module.exports = new UsuarioController();
