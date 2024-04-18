//cargue la conexion del grupo con postgres
const pool = require ('../data/config');


// Ruta de la app
const router = (app) => {
    // Mostrar mensaje de bienvenida de rrot
    app.get('/', (request, response) => {
        response.json({ message: '¡Bienvenido a Node.js Express REST API!' });
    });
};

module.exports = router;

//mostrar un solo usuario por ID
app.get('users/:id', (request, response)=>{
    const id= request.params.id;

    pool.query('SELECT * FROM users WHERE id = ?', id, (error, result)=> {
        if(error) throw error;
        response.send(result);
    })
})

//Mostrar todos los Usuarios
app.get('/users', (request, response)=>{
    pool.query('SELECT * FROM users', (error, result)=>{
        if (error) throw error;

        response.send(result);
    })
});

//id autoincremental 
//nombre del usuario 
//nombre completo del humano 
//database api