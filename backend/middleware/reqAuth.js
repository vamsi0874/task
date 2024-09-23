
const jwt = require('jsonwebtoken');

// Middleware to protect routes
const requireAuth = (req, res, next) => {
  
  const token = req.headers.authorization?.split(' ')[1]; // Get token from the Authorization header

  if (!token) {
    return res.status(401).json({ error: 'Access Denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Add user data to request object
    next(); 
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token. Access denied.' });
  }
};

module.exports = requireAuth;
