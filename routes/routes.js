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
            if (error) throw error;

            response.send(result.rows);
        });
    });

    // Agregar un nuevo usuario
    app.post('/users', (request, response) => {
        pool.query('INSERT INTO users SET ?', request.body, (error, result) => {
            if (error) throw error;
            
            response.status(201).send(`User added with ID: ${result.rows[0].id}`);
        });
    });

    // Actualizar un usuario
    app.put('/users/:id', (request, response) => {
        const id = request.params.id;

        pool.query('UPDATE users SET $1 WHERE id = $2', [request.body, id], (error, result) => {
            if (error) throw error;

            response.send("User updated successfully");
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


//id autoincremental 
//nombre del usuario 
//nombre completo del humano 
//database api