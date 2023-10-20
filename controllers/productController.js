const Product = require('../models/product');

exports.getAllProducts = (req, res) => {
  try {
    const filter = req.query.filter;
    let limit = parseInt(req.query.limit) || null;
    let offset = parseInt(req.query.offset) || null;
    console.log(filter)
    query = {}

    if(filter)
        query = { $or: [ 
        { title: { $regex: '.*' + filter + '.*' , $options: 'i' } }, 
        { reference: { $regex: '.*' + filter + '.*' , $options: 'i' } } ] 
      }
    
    let queryBuilder = Product.find(query);
    
    if (limit && limit > 0) {
      queryBuilder = queryBuilder.limit(limit);
    }

    if (offset && offset >= 0) {
      queryBuilder = queryBuilder.skip(offset);
    }

    queryBuilder
      .then((products) => {
        res.status(200).json(products);
      })
      .catch((error) => {
        res.status(500).json({ message: 'Error al buscar productos', error });
      });
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el productos", error: error.message });
  }


};

exports.getProductById = (req, res) => {
  const productId = req.params.id;

  Product.findById(productId)
    .then((product) => {
      if (!product) {
        return res.status(404).json({ message: 'Producto no encontrado' });
      }
      res.json(product);
    })
    .catch((error) => {
      res.status(500).json({ message: 'Error al buscar el producto', error });
    });
};

exports.createProduct = (req, res) => {
  try {
    const { reference, title, price, distributionPrice, description, images, caracteristics } = req.body;

    const newProduct = new Product({
      reference,
      title,
      price,
      distributionPrice,
      description,
      images,
      caracteristics,
    });

    newProduct
      .save()
      .then((product) => {
        res.status(201).json(product);
      })
      .catch((error) => {
        res.status(400).json({ message: 'Error al crear el producto', error });
      });
  } catch (error) {
    res.status(500).json({ message: "Error al crear el producto", error: error.message });
  }
};

exports.bulkProducts = async (req, res) => {
  try {
    const productsData = req.body;

    // Validaciones de datos antes de la inserción
    const invalidProducts = productsData.filter((product) => {
      // Aquí puedes agregar tus propias validaciones
      return (
        typeof product.reference !== 'string' ||
        typeof product.title !== 'string' ||
        typeof product.price !== 'number' ||
        typeof product.description !== 'string'
      );
    });

    if (invalidProducts.length > 0) {
      return res.status(400).json({ message: 'Datos de producto no válidos' });
    }

    const createdProducts = await Product.create(productsData);

    res.status(201).json(createdProducts);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear los productos', error });
  }
};

exports.updateProduct = (req, res) => {
  // Lógica para actualizar un producto
};

exports.deleteProduct = (req, res) => {
  // Lógica para eliminar un producto
};
