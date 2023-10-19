exports.getAllProducts = (req, res) => {
  const filter = req.query.filter;
  const limit = parseInt(req.query.limit);
  const offset = parseInt(req.query.offset);

  console.log(req.query)

  url = "https://api.escuelajs.co/api/v1/products/";

  console.log(url);

  fetch(
    `${url}?${
      filter === "" ? "" : "tilte=" + filter + "&"
    }offset=${offset}&limit=${limit}`
  )
    .then((response) => response.json())
    .then((response) => {
      res.json(response);
    })
    .catch((error) => {
      console.log('---------------error---------------')
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
