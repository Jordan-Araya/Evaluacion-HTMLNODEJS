// Archivo: src/app.js
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const logger = require('./middlewares/logger');
const productoRoutes = require('./routes/productos');
const dbService = require('./services/dbService');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));

app.use(express.static(path.join(__dirname, '../public')));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({
    secret: 'mi_clave_secreta_super_segura',
    resave: false,
    saveUninitialized: false
}));
app.use(logger);

app.get('/', (req, res) => {
    const alerta = req.query.alerta || null;
    res.render('login', { alerta });
});

app.post('/api/login', async (req, res) => {
    const { user, pass } = req.body;
    const esValido = await dbService.validarUsuario(user, pass);

    if (esValido) {
        req.session.usuario = user;
        res.redirect('/productos');
    } else {
        res.redirect('/?alerta=Credenciales incorrectas');
    }
});

app.get('/registro', (req, res) => {
    res.render('registro', { alerta: null });
});

app.post('/api/registro', async (req, res) => {
    try {
        const { user, pass } = req.body;
        await dbService.registrarUsuario(user, pass);
        res.redirect('/?alerta=Cuenta creada exitosamente. Inicia sesión.');
    } catch (error) {
        res.render('registro', { alerta: "Error al crear la cuenta" });
    }
});

app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/?alerta=Sesión cerrada');
});

// --- RUTA PÚBLICA DEL CATÁLOGO (Solo 1 vez) ---
app.get('/catalogo', async (req, res) => {
    try {
        const productos = await dbService.obtenerInventario();
        const estaLogueado = (req.session && req.session.usuario) ? true : false;

        res.render('catalogo', { productos, estaLogueado });
    } catch (error) {
        res.status(500).send("Error al cargar el catálogo");
    }
});

app.use('/productos', productoRoutes);

app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000'); 
});