const verificarSesion = (req, res, next) => {
    // Verifificaremos si la sesión existe y tiene un usuario ya asignado
    if (req.session && req.session.usuario) {
        return next(); // Si encontramos que si, pasaremos al siguiente paso
    }
    res.redirect('/'); // Si el usuario no ha iniciado sesion, se devuelve al login
};
module.exports = verificarSesion;