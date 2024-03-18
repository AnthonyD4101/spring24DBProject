const mysql = require('mysql');
const fs = require('fs');

require('dotenv').config();

const caCert = fs.readFileSync('DigiCertGlobalRootCA.crt.pem');

const poolConnection = mysql.createPool({
    connectionLimit: 10,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: {
      ca: caCert
    }
});

module.exports = poolConnection;