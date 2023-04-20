const jwt = require('jsonwebtoken');
const JWT_SECRET = 'mysecretkey';

// Middleware to check if the user is authenticated
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Get the token from the Authorization header

  try {
    const decodedToken = jwt.verify(token, JWT_SECRET);
    req.user = { id: decodedToken.id };
    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ error: 'Unauthorized' });
  }
};

module.exports = authMiddleware;