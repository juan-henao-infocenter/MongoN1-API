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

module.exports = { login };
