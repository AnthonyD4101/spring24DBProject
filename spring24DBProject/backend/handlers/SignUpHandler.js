const mysql = require('mysql');
const poolConnection = require('../server/database')

function handleSignUpRequest(req, res) {
  let requestBody = '';
  req.on('data', chunk => {
    requestBody += chunk.toString();
  });

  req.on('end', () => {
    const formData = JSON.parse(requestBody);
    const { firstName, middleName, lastName, email, phoneNumber, password } = formData;

    poolConnection.query(
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
