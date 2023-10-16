const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

// Importa las rutas de usuarios y productos
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');

// Usa las rutas en la aplicación
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
  

app.listen(port, () => {
  console.log(`Servidor API escuchando en el puerto ${port}`);
});
