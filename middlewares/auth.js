// middleware/auth.js
const jwt = require('jsonwebtoken');
const secretKey = 'tu_secreto'; // Debes usar una clave segura

const authenticate = (req, res, next) => {
  // Obtén el token del encabezado de autorización
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Token de acceso faltante' });
  }

  // Verifica y descodifica el token
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Token inválido' });
    }

    // El token es válido; adjunta los datos del usuario al objeto de solicitud
    req.user = decoded;

    next();
  });
};

module.exports = { authenticate };
