
const User = require("./models/user");
var mongoose = require("mongoose");
require("dotenv").config();
const bcrypt = require("bcrypt");

exports.connect  = () =>
mongoose
  .connect(process.env["DATABASE_URL"])
  .then(() => {
    console.log("conectado");

    User.countDocuments()
      .then((count) => {
        if (count === 0) {
          const defaultUser = new User({
            name: "Usuario Predeterminado",
            email: "usuario@example.com",
            password: bcrypt.hashSync("contrasena", 10),
            role: "admin",
          });

          return defaultUser.save();
        }
      })
      .then(() => {
        console.log("Usuario predeterminado creado con éxito.");
      })
      .catch((error) => {
        console.error("Error al crear el usuario predeterminado:", error);
      });
  })
  .catch((error) => console.log(error));