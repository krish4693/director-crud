// auth.js
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Function to sign a JWT token
const signToken = (payload) => {
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
    return token;
};

// Function to verify a JWT token
const verifyToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
};

// Middleware to authenticate and protect routes
const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Access Denied' });
    }

    try {
        const verified = verifyToken(token);
        req.user = verified; // Attach token payload to the request
        next();
    } catch (error) {
        res.status(400).json({ message: 'Invalid Token' });
    }
};

module.exports = { signToken, authenticateToken };
