const mysql = require('mysql');
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

function handleSignUpRequest(req, res) {
  let requestBody = '';
  req.on('data', chunk => {
    requestBody += chunk.toString();
  });

  req.on('end', () => {
    const formData = JSON.parse(requestBody);
    const { firstName, middleName, lastName, email, phoneNumber, password } = formData;

    pool.query(
      'INSERT INTO Account (AccountType, FirstName, MiddleName, LastName, PhoneNumber, Email, Password) VALUES (?, ?, ?, ?, ?, ?, ?)',
      ['Customer', firstName, middleName, lastName, phoneNumber, email, password],
      (error, results) => {
        if (error) {
          console.error('Database error:', error);
          res.writeHead(500);
          res.end('Server error');
          return;
        }
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Account created successfully' }));
      }
    );
  });
}

module.exports = { handleSignUpRequest };
