const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  description: {
    type: String,
    trim: true,
  },
  stock: {
    type: Number,
    default: 0,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId, // Cambio en el tipo de datos para referenciar el ID de la categoría
    ref: 'Category', // Hace referencia al modelo de Category
  },
  imageUrl: {
    type: String,
    default: 'default_image_url.jpg',
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  // Otros campos específicos de productos
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
