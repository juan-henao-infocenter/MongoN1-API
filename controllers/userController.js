const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();
const userSchema = require("../models/user");
const {createToken} = require("../middlewares/auth");

const usersFile = "./usersFile.json";

exports.loginUser = (req, res) => {
  const { email, password } = req.body;
  userSchema
    .findOne({ email: email })
    .then((data) => {
      if (data && bcrypt.compareSync(password, data.password)) {
        const token = createToken(data);

        res.json({ token });
      } else {
        res.status(401).json({ message: "Credenciales incorrectas" });
      }
    })
    .catch((error) => {
      res.status(400).json({ message: error.message });
    });
};

exports.getAllUsers = (req, res) => {
  userSchema
    .find()
    .then((data) => {
      res.json(data);
    })
    .catch((error) => res.json({ message: error }));
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
