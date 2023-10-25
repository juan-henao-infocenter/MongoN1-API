const Product = require("../../models/product");

const getAllProducts = async (args) => {
  try {
    const filter = args.filter;
    let limit = parseInt(args.limit) || null;
    let offset = parseInt(args.offset) || null;
    query = {};

    if (filter)
      query = {
        $or: [
          { title: { $regex: ".*" + filter + ".*", $options: "i" } },
          { reference: { $regex: ".*" + filter + ".*", $options: "i" } },
        ],
      };

    let queryBuilder = Product.find(query);

    if (limit && limit > 0) {
      queryBuilder = queryBuilder.limit(limit);
    }

    if (offset && offset >= 0) {
      queryBuilder = queryBuilder.skip(offset);
    }

    return await queryBuilder;
  } catch (error) {
    throw new Error({
      message: "Error al obtener el productos",
      error: error.message,
    });
  }
};

const getProduct = async (args) => {
  try {
    const id = args.id;

    if (!id) {
      throw new Error("No se ha enviado un ID valido");
    }

    const product = await Product.findById(id);

    if (!product) {
      throw new Error(`El producto con id ${id}, no existe`);
    }

    return product;
  } catch (error) {
    throw new Error(`Error al obtener el producto: ${error.message}`);
  }
};

//crear metodo para guardar un Product desde args, validar que no exista uno con el mismo reference
const addProduct = async (args) => {
  //validar que no exista uno con el mismo reference
  try {
    const existingProduct = await Product.findOne({
      reference: args.reference,
    });
    if (existingProduct) {
      throw new Error("Ya hay un producto registrado con este referencial");
    }
    
    const newProduct = new Product({
      title:args.title,
      reference:args.reference,
      description:args.description,
      price:args.price,
      caracteristics:args.caracteristics,
      images:args.images
      
    });
    return await newProduct.save();
  } catch (err) {
    console.log(err);
    throw err;
  }
};
//actualizar metodo de actualizar un producto por su id
const updateProduct = async ({ id, args }) => {
  let updatedData = {};
  for (let key in args) {
    updatedData[key] = args[key];
  }
  let result = await Product.updateOne({ _id: id }, { $set: updatedData });
  if (!result || !result.nModified) {
    throw new Error(`No se pudo actualizar el producto con id ${id}`);
  } else {
    return `Se actualizaron los campos del producto con id ${id}`;
  }
};

module.exports = { getAllProducts, getProduct, addProduct };
