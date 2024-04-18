//Require packages and set the port
const express = require ('express');
const port=3001;
// para permitir manejo de POST y PUT
const bodyParse =require ('body-parse');
const routes = require ('./routes/routes');
const app = express();

//Usar Node.js body parsing middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended : true,
}));

//Iniciar el servidor
const server=app.listen(port, (error)=> {
    if (error) return console.log('Error: ${error}');
    console.log('El servidor escucha en el puerto ${server.address().port}');
});