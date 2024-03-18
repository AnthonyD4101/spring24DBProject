const poolConnection = require('../database');

function handleSignInRequest(req, res) {
    let body = '';
    req.on('data', chunk => {
        body += chunk.toString(); // Convert the chunk to string and append it to the body variable
    });

    req.on('end', () => {
        // Parse the body string to JSON
        const requestBody = JSON.parse(body);

        const { email, password } = requestBody;

        // Check if email and password are provided
        if (!email || !password) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Email and password are required' }));
            return;
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Invalid email format' }));
            return;
        }

        // Validate password length (for example, minimum length of 6 characters)
        if (password.length < 6) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Password must be at least 6 characters long' }));
            return;
        }

        // Query the database to check if the user exists and the provided password matches
        const queryString = 'SELECT * FROM Account WHERE email = ? AND password = ?';
        poolConnection.query(queryString, [email, password], (error, results) => {
            if (error) {
                console.error('Database error:', error);
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Server error' }));
                return;
            }

            if (results.length === 0) {
                // User not found or invalid credentials
                res.writeHead(401, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Invalid email or password' }));
                return;
            }

            // User authenticated successfully
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Sign in successful', user: results[0] }));
        });
    });
}

module.exports = { handleSignInRequest };
