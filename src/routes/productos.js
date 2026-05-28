
const express = require('express');
const router = express.Router();
const controller = require('../controllers/productoController');
const auth = require('../middlewares/auth'); 

// Endpoints 
router.get('/', auth, controller.listarProductos); 
router.post('/', auth, controller.crearProducto); 
router.post('/eliminar/:id', auth, controller.eliminarProducto); 

module.exports = router;