require('dotenv').config();
const jwt = require('jsonwebtoken');

const JWT_CONFIG = {
  expiresIn: '5d',
  algorithm: 'HS256',
};

const { JWT_SECRET } = process.env;

const generateToken = (payload) => jwt.sign({ payload }, JWT_SECRET, JWT_CONFIG);

const verifyToken = (token) => {
  const decoded = jwt.verify(token, JWT_SECRET);

  return decoded.payload;
};

module.exports = {
  generateToken,
  verifyToken,
};
