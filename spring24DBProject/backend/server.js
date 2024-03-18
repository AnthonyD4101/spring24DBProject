const http = require('http');
const { handleSignUpRequest } = require('./handlers/SignUpHandler');

const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  // Route requests to appropriate handlers
  if (req.method === 'POST' && req.url === '/api/signUp') {
    handleSignUpRequest(req, res);
  } else {
    // Handle other routes
    res.writeHead(404);
    res.end('Not Found');
  }
});

const PORT = process.env.DB_PORT;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});