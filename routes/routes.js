// Cargar la conexión del grupo con PostgreSQL
const pool = require('../data/config');

// Ruta de la app
const router = (app) => {
    // Mostrar mensaje de bienvenida en la ruta raíz
    app.get('/', (request, response) => {
        response.json({ message: '¡Bienvenido a Node.js Express REST API!' });
    });

    // Mostrar un solo usuario por ID
    app.get('/users/:id', (request, response) => {
        const id = request.params.id;

        pool.query('SELECT * FROM users WHERE id = $1', [id], (error, result) => {
            if (error) throw error;
            response.send(result.rows);
        });
    });

    // Mostrar todos los Usuarios
    app.get('/users', (request, response) => {
        pool.query('SELECT * FROM users', (error, result) => {
            if (error) throw error;{

            response.send(result.rows);
            }
        });
    });


// Agregar un nuevo usuario
app.post('/users', (request, response) => {
    const userData = request.body;
    pool.query('INSERT INTO users (id, user_name, full_name) VALUES ($1, $2, $3)', [userData.id, userData.user_name, userData.full_name], (error, result) => {
        if (error) {
            console.error('Error al agregar un nuevo usuario:', error);
            response.status(500).send('Error interno del servidor');
        } else {
            console.log('Usuario agregado con éxito');
            response.status(201).send(`Usuario agregado con ID: ${userData.id}`);
        }
    });
});



// Actualizar un usuario
app.put('/users/:id', (request, response) => {
    const id = request.params.id;
    const userData = request.body;

    pool.query('UPDATE users SET user_name = $1, full_name = $2 WHERE id = $3', [userData.user_name, userData.full_name, id], (error, result) => {
        if (error) {
            console.error('Error al actualizar el usuario:', error);
            response.status(500).send('Error interno del servidor');
        } else {
            console.log('Usuario actualizado con éxito');
            response.send("Usuario actualizado correctamente");
        }
    });
});


    // Borrar un Usuario
    app.delete('/users/:id', (request, response) => {
        const id = request.params.id;

        pool.query('DELETE FROM users WHERE id = $1', [id], (error, result) => {
            if (error) throw error;

            response.send("User deleted");
        });
    });
};

// Exportar el Router
module.exports = router;

