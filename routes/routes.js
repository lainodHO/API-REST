// Importa bcryptjs y express-session
const session = require('express-session');
const bcrypt = require('bcryptjs');
// Cargar la conexión del grupo con PostgreSQL
const pool = require('../data/config');

// Ruta de la aplicación
const router = (app) => {
    // Mostrar mensaje de bienvenida en la ruta raíz
    app.get('/', (request, response) => {
        response.json({ message: '¡Bienvenido a Node.js Express REST API!' });
    });

    // Mostrar un solo usuario por ID
    app.get('/users/:id', (request, response) => {
        const id = request.params.id;
    
        pool.query('SELECT * FROM users WHERE id = ?', id, (error, results) => {
            if (error) throw error;
            response.send(results);
        });
    });
    

    // Mostrar todos los Usuarios
    app.get('/users', (request, response) => {
        pool.query('SELECT * FROM users', (error, results) => {
            if (error) throw error;
            response.send(results);
        });
    });
    

    // Agregar un nuevo usuario
    app.post('/users', (request, response) => {
        const userData = request.body;
        const plaintextPassword = userData.contrasea; // Obtén la contraseña sin hashear desde la solicitud

        // Hashea la contraseña antes de almacenarla en la base de datos
        bcrypt.hash(plaintextPassword, 10, (err, hash) => {
            if (err) {
                console.error('Error al hashear la contraseña:', err);
                response.status(500).send('Error interno del servidor');
                return;
            }// Importa bcryptjs
const bcrypt = require('bcryptjs');
// Cargar la conexión del grupo con PostgreSQL
const pool = require('../data/config');

// Ruta de la aplicación
const router = (app) => {
    // Mostrar mensaje de bienvenida en la ruta raíz
    app.get('/', (request, response) => {
        response.json({ message: '¡Bienvenido a Node.js Express REST API!' });
    });

    // Mostrar un solo usuario por ID
    app.get('/users/:id', (request, response) => {
        const id = request.params.id;
    
        pool.query('SELECT * FROM users WHERE id = ?', id, (error, results) => {
            if (error) throw error;
            response.send(results);
        });
    });
    

    // Mostrar todos los Usuarios
    app.get('/users', (request, response) => {
        pool.query('SELECT * FROM users', (error, results) => {
            if (error) throw error;
            response.send(results);
        });
    });
    

    // Agregar un nuevo usuario
    app.post('/users', (request, response) => {
        const userData = request.body;
        const plaintextPassword = userData.contrasea; // Obtén la contraseña sin hashear desde la solicitud

        // Genera un salt
        bcrypt.genSalt(10, (err, salt) => {
            if (err) {
                console.error('Error al generar el salt:', err);
                response.status(500).send('Error interno del servidor');
                return;
            }

            // Hashea la contraseña con el salt
            bcrypt.hash(plaintextPassword, salt, (err, hash) => {
                if (err) {
                    console.error('Error al hashear la contraseña:', err);
                    response.status(500).send('Error interno del servidor');
                    return;
                }
                
                // Almacena el usuario en la base de datos con la contraseña hasheada
                pool.query('INSERT INTO users (nombre, contrasea) VALUES (?, ?)', [userData.nombre, hash], (error, result) => {
                    if (error) {
                        console.error('Error al agregar un nuevo usuario:', error);
                        response.status(500).send('Error interno del servidor');
                    } else {
                        console.log('Usuario agregado con éxito');
                        response.status(201).send(`Usuario agregado con ID: ${result.insertId}`);
                    }
                });
            });
        });
    });

    // Actualizar un usuario
    app.put('/users/:id', (request, response) => {
        const id = request.params.id;
        const userData = request.body;
        const plaintextPassword = userData.contrasea; // Obtén la nueva contraseña sin hashear desde la solicitud

        // Genera un salt
        bcrypt.genSalt(10, (err, salt) => {
            if (err) {
                console.error('Error al generar el salt:', err);
                response.status(500).send('Error interno del servidor');
                return;
            }

            // Hashea la nueva contraseña con el salt
            bcrypt.hash(plaintextPassword, salt, (err, hash) => {
                if (err) {
                    console.error('Error al hashear la contraseña:', err);
                    response.status(500).send('Error interno del servidor');
                    return;
                }

                // Actualiza el usuario en la base de datos con la contraseña hasheada
                pool.query('UPDATE users SET nombre = ?, contrasea = ? WHERE id = ?', [userData.nombre, hash, id], (error, result) => {
                    if (error) {
                        console.error('Error al actualizar el usuario:', error);
                        response.status(500).send('Error interno del servidor');
                    } else {
                        console.log('Usuario actualizado con éxito');
                        response.send("Usuario actualizado correctamente");
                    }
                });
            });
        });
    });

    // Borrar un Usuario
    app.delete('/users/:id', (request, response) => {
        const id = request.params.id;

        pool.query('DELETE FROM users WHERE id = ?', [id], (error, result) => {
            if (error) {
                console.error('Error al eliminar el usuario:', error);
                response.status(500).send('Error interno del servidor');
            } else {
                console.log('Usuario eliminado con éxito');
                response.send("Usuario eliminado correctamente");
            }
        });
    });
};

// Exportar el Router
module.exports = router;


            // Almacena el usuario en la base de datos con la contraseña hasheada
            pool.query('INSERT INTO users (nombre, contrasea) VALUES (?, ?)', [userData.nombre, hash], (error, result) => {
                if (error) {
                    console.error('Error al agregar un nuevo usuario:', error);
                    response.status(500).send('Error interno del servidor');
                } else {
                    console.log('Usuario agregado con éxito');
                    response.status(201).send(`Usuario agregado con ID: ${result.insertId}`);
                }
            });
        });
    });

    // Actualizar un usuario
    app.put('/users/:id', (request, response) => {
        const id = request.params.id;
        const userData = request.body;
        const plaintextPassword = userData.contrasea; // Obtén la nueva contraseña sin hashear desde la solicitud

        // Hashea la nueva contraseña antes de actualizarla en la base de datos
        bcrypt.hash(plaintextPassword, 10, (err, hash) => {
            if (err) {
                console.error('Error al hashear la contraseña:', err);
                response.status(500).send('Error interno del servidor');
                return;
            }

            // Actualiza el usuario en la base de datos con la contraseña hasheada
            pool.query('UPDATE users SET nombre = ?, contrasea = ? WHERE id = ?', [userData.nombre, hash, id], (error, result) => {
                if (error) {
                    console.error('Error al actualizar el usuario:', error);
                    response.status(500).send('Error interno del servidor');
                } else {
                    console.log('Usuario actualizado con éxito');
                    response.send("Usuario actualizado correctamente");
                }
            });
        });
    });

    // Borrar un Usuario
    app.delete('/users/:id', (request, response) => {
        const id = request.params.id;

        pool.query('DELETE FROM users WHERE id = ?', [id], (error, result) => {
            if (error) {
                console.error('Error al eliminar el usuario:', error);
                response.status(500).send('Error interno del servidor');
            } else {
                console.log('Usuario eliminado con éxito');
                response.send("Usuario eliminado correctamente");
            }
        });
    });
};


// Configura express-session
app.use(session({
    secret: 'lainod', // Clave secreta para firmar la cookie de sesión
    resave: false,
    saveUninitialized: false
}));

// Middleware para analizar los datos del formulario
app.use(bodyParser.urlencoded({ extended: true }));

// Ruta para el inicio de sesión
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Consulta en tu base de datos si el usuario existe
    // Por ahora, simulamos una base de datos de usuarios
    const users = {
        Daniel: '$2a$10$RiolqdH1I7b6SovWdkfwdeoCYk7ZDYQ6VdG3QVrQZAbERWbzabUF6', // Hash de la contraseña 'contraseña'
        Angel: '$2a$10$0Ib6GRMm6xXRVaDcR4Oz1unepiB3BATTEC0.QnfS70A737hlUwNEa',
        Randy: 'CocaCola',
        Cindy: '$2a$10$4rOtYSo52GyATxMI4KF2keL/JiQ/wuJUkPKF6bFKzGK6ZltUyUCTG',
        DASE: '$2a$10$HvsjQJwWYtzQLbbXbo.cSuy9ETVcTRj0plLJJUDhh/jsSlmpEjdru',
        Noelia: '$2a$10$v0cGXsGmLzpYTVVQ8miWTOH6jnbi9czWZ3rF1oojXMF9e8X5VWiBO'
    };

    // Verifica si el usuario existe y si la contraseña coincide
    const hashedPassword = users[username];
    if (hashedPassword) {
        bcrypt.compare(password, hashedPassword, (err, result) => {
            if (err) {
                console.error('Error al comparar contraseñas:', err);
                res.status(500).send('Error interno del servidor');
                return;
            }

            if (result) {
                // Si las contraseñas coinciden, establece una sesión para el usuario
                req.session.username = username;
                res.send('Inicio de sesión exitoso');
            } else {
                res.status(401).send('Credenciales inválidas');
            }
        });
    } else {
        res.status(401).send('Credenciales inválidas');
    }
});









// Exportar el Router
module.exports = router;
