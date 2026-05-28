const dbService = require('../services/dbService');

const listarProductos = async (req, res) => {
    try {
        const productos = await dbService.obtenerInventario();
        const alerta = req.query.alerta || null; 
        res.render('inventario', { productos, alerta }); 
    } catch (error) {
        console.log(error);
        res.status(500).send("Error interno del servidor");
    }
};

const crearProducto = async (req, res) => {
    try {
        const { nombre, categoria, precio, imagen_url } = req.body;
        await dbService.guardarProducto(nombre, categoria, precio, imagen_url);
        res.redirect('/productos?alerta=Producto agregado exitosamente'); 
    } catch (error) {
        res.redirect('/productos?alerta=Error al guardar el producto');
    }
};

const eliminarProducto = async (req, res) => {
    try {
        await dbService.eliminarProducto(req.params.id);
        res.redirect('/productos?alerta=Producto eliminado');
    } catch (error) {
        res.redirect('/productos?alerta=Error al eliminar');
    }
};

module.exports = { listarProductos, crearProducto, eliminarProducto };