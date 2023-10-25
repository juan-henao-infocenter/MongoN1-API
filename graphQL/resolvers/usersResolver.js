const User = require("../../models/user");
const { createToken } = require("../../middlewares/auth");
const bcrypt = require("bcrypt");

const login = async (args) => {
  try {
    const { email, password } = args;

    var user = await User.findOne({ email: email });

    if (user && bcrypt.compareSync(password, user.password)) {
      return createToken(user);
    } else {
      throw new Error("Credenciales incorrectas");
    }
  } catch (error) {
    throw new Error("Error en el login: " + error);
  }
};

const getUser = async (id) => {
  try {
    let user = await User.findById(id).select("-__v -password");

    if (user) {
      return user;
    } else {
      throw new Error("Credenciales incorrectas");
    }
  } catch (error) {
    throw new Error("Error al obtener el usuario: " + error);
  }
};

const createUser = async (args) => {
  console.log("Creando Usuario");
  try {
    const { name, lastName, email, password, role } = args;
    let existingUser = await User.findOne({ email });
    if (!existingUser) {
      let hashedPassword = await bcrypt.hash(password, 10);
      let createdUser = new User({
        name,
        lastName,
        email,
        password: hashedPassword,
      });
      createdUser = await createdUser.save();
      return createdUser;
    } else {
      throw new Error("El correo electronico ya existe");
    }
  } catch (err) {
    throw new Error("Error al obtener el usuario: " + error);
  }
};

module.exports = { login, getUser, createUser };
