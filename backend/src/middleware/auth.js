const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
  const authHeader = req.header('Authorization');
  console.log('Authorization Header:', authHeader); // Log the header

  if (!authHeader) {
    console.error('No Authorization Header'); // Debug log
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  const token = authHeader.split(' ')[1];
  console.log('Extracted Token:', token); // Log the token

  if (!token) {
    console.error('Token Missing in Authorization Header'); // Debug log
    return res.status(401).json({ error: 'Access denied. Token missing.' });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Token Verified Successfully:', verified); // Debug log
    req.user = verified; // Attach user info to request
    next(); // Proceed
  } catch (err) {
    console.error('Token Verification Failed:', err.message); // Log verification error
    res.status(400).json({ error: 'Invalid or expired token.' });
  }
};

module.exports = authenticate;
