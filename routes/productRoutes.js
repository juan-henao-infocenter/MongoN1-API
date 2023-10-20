const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { authenticate } = require('../middlewares/auth');
const checkUserRole = require('../middlewares/checkUserRole');

router.get('/', productController.getAllProducts);
router.get('/:id', authenticate, productController.getProductById);
router.post('/', authenticate, checkUserRole("admin"), productController.createProduct);
router.post('/bulk', authenticate, checkUserRole("admin"), productController.bulkProducts);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

module.exports = router;
