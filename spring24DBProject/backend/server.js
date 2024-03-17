const http = require('http');
const mysql = require('mysql');
const url = require('url');
const fs = require('fs');

// Read the CA certificate file
const caCert = fs.readFileSync('DigiCertGlobalRootCA.crt.pem');

// Create MySQL connection pool with SSL options
const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'team8-mysql-server.mysql.database.azure.com',
  user: 'team8admin',
  password: 'admin-3380',
  database: 'parkdb',
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