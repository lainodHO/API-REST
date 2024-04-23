//Require packages and set the port
const express = require ('express');
const port=3001;
// para permitir manejo de POST y PUT
const bodyParser = require('body-parser');
const routes = require ('./routes/routes');
const app = express();

//Usar Node.js body parsing middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended : true,
}));

routes(app);
//Iniciar el servidor
const server=app.listen(port, (error)=> {
    if (error) return console.log('Error: ${error}');
    console.log(`El servidor escucha en el puerto ${3001}`);

});

