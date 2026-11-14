// 1. Load environment variables
require('dotenv').config();

const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// ==========================================
// MIDDLEWARE
// ==========================================

// JSON Parsing Middleware
app.use(express.json());

// BONUS: Custom Middleware to log requests
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));


// ==========================================
// ROUTES
// ==========================================

// GET / -> "My Week 2 API!"
app.get('/', (req, res) => {
    res.send('My Week 2 API!');
});

// POST /user -> Accepts {name, email}; responds "Hello, [name]!"
app.post('/user', (req, res) => {
    // This extracts the data from the request body.
    // If you send YOUR data, req.body.name will be "Olorutoba Tomisin Jesunifemi"
    const { name, email } = req.body;

    // Error handling: 400 for missing data
    if (!name || !email) {
        return res.status(400).json({ error: 'Missing name or email in request body.' });
    }

    // If you test with your email, it will respond: "Hello, Olorutoba Tomisin Jesunifemi!"
    res.send(`Hello, ${name}!`);
});

// GET /user/:id -> "User [id] profile"
app.get('/user/:id', (req, res) => {
    res.send(`User ${req.params.id} profile`);
});


// ==========================================
// ERROR HANDLING MIDDLEWARE
// ==========================================
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong on the server!' });
});


// ==========================================
// SERVER START
// ==========================================
app.listen(PORT, () => {
    console.log(`=========================================`);
    console.log(`Server started by: Olorutoba Tomisin Jesunifemi`);
    console.log(`Email: tomisinoloruntoba42@gmail.com`);
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(`=========================================`);
});