const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
    const authHeader = req.header('Authorization'); // Retrieve Authorization header
    if (!authHeader) {
        return res.status(401).json({ error: 'Access denied' });
    }

    // Extract the token part (after "Bearer")
    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'Access denied' });
    }

    try {
        // Verify the token using the secret
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified; // Attach the verified payload to `req.user`
        next(); // Proceed to the next middleware or route
    } catch (err) {
        res.status(400).json({ error: 'Invalid token' });
    }
};

module.exports = authenticate;
