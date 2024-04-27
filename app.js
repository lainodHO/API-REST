const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const routeConfig = require('./routes/routes'); // Renamed to avoid conflict with function name

const app = express();
const PORT = 3002;

// Middleware para manejar las solicitudes POST y PUT
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware para servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Configuración de las rutas
routeConfig(app); // Renamed to avoid conflict with function name

// Manejo de rutas no encontradas
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});

// Inicio del servidor
app.listen(PORT, () => {
    console.log(`Server running at http://dhoubuntu.fullstack.com.mx:${PORT}/`);
});

function configureRoutes(app) { // Renamed to avoid conflict with module name
    // Rutas GET
    app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, 'public', 'index.html'));
    });
}