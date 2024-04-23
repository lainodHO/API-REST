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

// Importa el módulo pg
const { Pool } = require('pg');

// Configura las credenciales de conexión a la base de datos
const config = {
    user: 'dani',
    host: 'localhost',
    database: 'api',
    password: 'Daniel19', // Aún por definir
    port: 5432, // Puerto predeterminado de PostgreSQL
};

// Crea un pool de PostgreSQL
const pool = new Pool(config);

// Exporta el pool para poder usarlo en otros archivos
module.exports = pool;