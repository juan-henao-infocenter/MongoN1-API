require('dotenv').config();
const jwt = require('jsonwebtoken');
const user = require('../models/user');
const secretKey = process.env.SECRET_KEY; 

const authenticate = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Token de acceso faltante' });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      console.log(err)
      return res.status(401).json({ message: 'Token inválido' });
    }

    req.user = decoded;
    next();
  });
};

module.exports = { authenticate };
