const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
    const authHeader = req.header('Authorization'); // Retrieve Authorization header
    if (!authHeader) {
        console.log('Authorization header missing');
        return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    // Extract the token part (after "Bearer")
    const token = authHeader.split(' ')[1];
    if (!token) {
        console.log('Token missing');
        return res.status(401).json({ error: 'Access denied. Token missing.' });
    }

    try {
        console.log('Token:', token);

        // Verify the token using the secret
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Token successfully verified:', verified);

        req.user = verified; // Attach the verified payload to `req.user`
        next(); // Proceed to the next middleware or route
    } catch (err) {
        console.log('Token verification failed:', err.message);
        res.status(400).json({ error: 'Invalid token.' });
    }
};

module.exports = authenticate;
