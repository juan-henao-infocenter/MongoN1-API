require("dotenv").config();
const jwt = require("jsonwebtoken");
const secretKey = process.env["SECRET_KEY"];

const authenticate = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "Token de acceso faltante" });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      console.log(err);
      return res.status(401).json({ message: "Token inválido" });
    }

    req.user = decoded;
    next();
  });
};

const validateToken = (req, res, next) => {
  try{
    const token = req.headers.authorization;
  
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        next();
      } else {
        req.user = decoded;
        next();
      }
    });
    
  }
  catch(error){
    console.error(error.message);
    next();
  }
};

const checkUserRole = (requiredRole) => (req, res, next) => {
  const user = req.user;
  if (user && user.role === requiredRole) {
    next();
  } else {
    return res
      .status(403)
      .json({ message: "Acceso denegado. Rol requerido: " + requiredRole });
  }
};

const createToken = (data) => {
  return jwt.sign({ userId: data.id, role: data.role }, secretKey, {
    expiresIn: "1h",
  });
};

module.exports = { authenticate, createToken, validateToken, checkUserRole };
