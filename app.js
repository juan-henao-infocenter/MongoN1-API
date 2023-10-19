const express = require('express');
const cors = require('cors');
const app = express();
const bcrypt = require('bcrypt');
require('dotenv').config();
const port = process.env.PORT || 5000;
const User = require('./models/user');
var mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE_URL)
.then(  console.log("conectado"))
.catch((error)=>console.log(error));

User.countDocuments()
  .then((count) => {
    if (count === 0) {
      const defaultUser = new User({
        name: 'Usuario Predeterminado',
        email: 'usuario@example.com',
        password: bcrypt.hashSync('contrasena', 10),
      });

      return defaultUser.save();
    }
  })
  .then(() => {
    console.log('Usuario predeterminado creado con éxito.');
  })
  .catch((error) => {
    console.error('Error al crear el usuario predeterminado:', error);
  });

app.use(express.json());
app.use(cors());
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');

app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);

app.listen(port, () => {
  console.log(`Servidor API escuchando en el puerto ${port}`);
});
