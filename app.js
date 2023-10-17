const express = require('express');
const fs = require('fs');
const app = express();
const bcrypt = require('bcrypt');
require('dotenv').config();
const port = process.env.PORT || 5000;

app.use(express.json());
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');

app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
  
const usersFile = './usersFile.json';

if (fs.existsSync(usersFile)) {
  console.log('El archivo de usaruios ya existe.');
} else {
    console.log(usersFile);
    const hashedPassword1 = bcrypt.hashSync('contrasena1', 10); 
    const hashedPassword2 = bcrypt.hashSync('contrasena2', 10); 
  
    const users = [
      {
        id: 1,
        email: 'usuario1@example.com',
        password: hashedPassword1,
      },
      {
        id: 2,
        email: 'usuario2@example.com',
        password: hashedPassword2,
      },
    ];
  
    const userData = { users };
    fs.writeFileSync(usersFile, JSON.stringify(userData, null, 2), 'utf8');
}

app.listen(port, () => {
  console.log(`Servidor API escuchando en el puerto ${port}`);
});
