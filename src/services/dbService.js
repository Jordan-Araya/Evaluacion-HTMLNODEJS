const pool = require('../data/db'); 

const validarUsuario = async (usuario, clave) => {
    const [rows] = await pool.query('SELECT * FROM usuarios WHERE usuario = ? AND clave = ?', [usuario, clave]);
    return rows.length > 0;
};

const registrarUsuario = async (usuario, clave) => {
    await pool.query('INSERT INTO usuarios (usuario, clave) VALUES (?, ?)', [usuario, clave]);
};

const obtenerInventario = async () => {
    const [rows] = await pool.query('SELECT * FROM productos');
    return rows;
};

const guardarProducto = async (nombre, categoria, precio, imagen_url) => {
    await pool.query('INSERT INTO productos (nombre, categoria, precio, imagen_url) VALUES (?, ?, ?, ?)', [nombre, categoria, precio, imagen_url]);
};

const eliminarProducto = async (id) => {
    await pool.query('DELETE FROM productos WHERE id = ?', [id]);
};

module.exports = { validarUsuario, registrarUsuario, obtenerInventario, guardarProducto, eliminarProducto };