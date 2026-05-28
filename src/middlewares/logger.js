
const logger = (req, res, next) => {
    console.log(`[${new Date().toISOString()}] Petición: ${req.method} a ${req.url}`);
    next();
};
module.exports = logger;