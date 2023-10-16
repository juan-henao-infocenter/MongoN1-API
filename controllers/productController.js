// productController.js
exports.getAllProducts = (req, res) => {
  // Aquí puedes realizar alguna lógica para obtener datos de productos
  fetch("https://api.escuelajs.co/api/v1/products/" )
    .then((response) => response.json())
    .then((response) => {
      console.log(
        "--------------------------------------------------------------------------------despues del llamado--------------------------------------------"
      );
      console.log(response);
      res.json(response);
    })
    .catch((error) => {
      console.log("Error:", error);
    });
  
};

exports.getProductById = (req, res) => {
  // Lógica para obtener un producto por ID
};

exports.createProduct = (req, res) => {
  // Lógica para crear un nuevo producto
};

exports.updateProduct = (req, res) => {
  // Lógica para actualizar un producto
};

exports.deleteProduct = (req, res) => {
  // Lógica para eliminar un producto
};
