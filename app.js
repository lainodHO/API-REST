const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const routeConfig = require('./routes/routes'); // Renamed to avoid conflict with function name
const bcrypt = require('bcryptjs');
const app = express();
const PORT = 3003;

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


// Inicio del servidor para escuchar en todas las interfaces de red local
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running at http://192.168.1.104:${PORT}/`);

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

const plaintextPassword = 'contraseñaDelUsuario'; // La contraseña proporcionada por el usuario

// Genera un salt
bcrypt.genSalt(10, (err, salt) => {
    if (err) {
        // Maneja el error
        return;
    }
    
    // Hashea la contraseña con el salt
    bcrypt.hash(plaintextPassword, salt, (err, hash) => {
        if (err) {
            // Maneja el error
            return;
        }
        
        // Aquí puedes almacenar el hash en la base de datos
        console.log(hash); // Este es el hash seguro que puedes almacenar
    });
});


});
