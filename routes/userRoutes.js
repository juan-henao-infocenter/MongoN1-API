const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authenticate, checkUserRole } = require('../middlewares/auth');

router.get('/',authenticate, checkUserRole("admin"), userController.getAllUsers);
router.post('/login', userController.loginUser);
router.post('/', userController.createUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;
