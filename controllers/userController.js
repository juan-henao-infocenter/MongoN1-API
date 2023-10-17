const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();

const usersFile = './usersFile.json';
const secretKey = process.env.SECRET_KEY; 

exports.loginUser = (req, res) => {
  console.log(req)
  console.log(req.body)
  const { email, password } = req.body;
  const usersData = JSON.parse(fs.readFileSync(usersFile, 'utf8'));
  const user = usersData.users.find((u) => u.email === email);

  if (user && bcrypt.compareSync(password, user.password)) {
    const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: '1h' });

    res.json({ token });
  } else {
    res.status(401).json({ message: 'Credenciales incorrectas' });
  }
};

exports.getAllUsers = (req, res) => {
  // Lógica para obtener todos los usuarios
};

exports.getUserById = (req, res) => {
  // Lógica para obtener un usuario por ID
};

exports.createUser = (req, res) => {
  // Lógica para crear un nuevo usuario
};

exports.updateUser = (req, res) => {
  // Lógica para actualizar un usuario
};

exports.deleteUser = (req, res) => {
  // Lógica para eliminar un usuario
};
