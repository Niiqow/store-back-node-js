const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cart');

// Rutas relacionadas con carritos de compras
router.post('/add-to-cart', cartController.addToCart);
router.get('/view-cart', cartController.viewCart);
router.post('/purchase', cartController.purchase);

module.exports = router;
