const product = require('../../models/product');
const Product = require('../../models/product');

const getAllProducts = async (args)=>{
    try {
        const filter = args.filter;
        let limit = parseInt(args.limit) || null;
        let offset = parseInt(args.offset) || null;
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
    
        return await queryBuilder;

      } catch (error) {
        throw new Error({ message: "Error al obtener el productos", error: error.message });
      }
}

const getProduct = async (args)=>{
  try {
      const id = args.id;

      if(!id){
        throw new Error("No se ha enviado un ID valido");
      }
        
      const product = await Product.findById(id);

      if(!product){
        throw new Error(`El producto con id ${id}, no existe`);
      }

      return product

    } catch (error) {
      throw new Error(`Error al obtener el producto: ${error.message}`);
    }
}

module.exports = { getAllProducts, getProduct }