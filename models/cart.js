const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Referencia al modelo de usuario (si lo tienes)
    required: true,
  },
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product', // Referencia al modelo de producto
    },
  ],
  // Otros campos específicos de carritos de compras, como fecha de compra, total, etc.
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
