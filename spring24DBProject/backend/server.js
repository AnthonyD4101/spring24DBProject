const http = require('http');
const mysql = require('mysql');
const url = require('url');
const fs = require('fs');
require('dotenv').config();

const caCert = fs.readFileSync('DigiCertGlobalRootCA.crt.pem');

const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: {
    ca: caCert
  }
});

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);

  if (parsedUrl.pathname === '/api/accountInfo' && req.method === 'GET') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    
    pool.query('SELECT * FROM Account', (error, results) => {
        if (error) {
            console.error('Database error:', error);
            res.writeHead(500);
            res.end('Server error');
            return;
        }
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(results));
    });
  } else {
    res.writeHead(404);
    res.end('Not Found');
  }
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});