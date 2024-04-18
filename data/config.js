//const mysql = require('mysql');

//set database connection credentials
//const config = {
//    host: 'localhost' ,
//    user: 'root',
//    password: 'root',
//    database: 'api',
//};

//create a Mysql pool
//const pool = mysql.createPool(config);

//Export the pool
//module.exports = pool;

const { Pool } = require('pg');

// Configura las credenciales de conexión a la base de datos
const config = {
    user: 'postgres',
    host: 'localhost',
    database: 'api',
    password: 'root',//Se queda por definir
    port: 5432, // Puerto predeterminado de PostgreSQL
};

// Crea un pool de PostgreSQL
const pool = pg.createPool(config);

// Exporta el pool para poder usarlo en otros archivos
module.exports = pool;
