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

module.exports = { getAllProducts }