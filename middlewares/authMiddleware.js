const token = require('../utils/token');

const authMiddleware = (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) return res.status(401).json({ message: 'Missing auth token' });

    const user = token.verifyToken(authorization);
    req.user = user;

    next();
  } catch (error) {
   console.log(`Error auth: ${error.message}`);
   return res.status(401).json({ message: error.message });
  }
};

module.exports = authMiddleware;
