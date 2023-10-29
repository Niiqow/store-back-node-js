const express = require('express');
const router = express.Router();
const productController = require('../controllers/products');

// Rutas relacionadas con productos
router.post('/add', productController.addProduct);
router.get('/list', productController.getAllProducts);
router.get('/details/:id', productController.getProductDetails);
router.put('/update/:id', productController.updateProduct);
router.delete('/delete/:id', productController.deleteProduct);

module.exports = router;
