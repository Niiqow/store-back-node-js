const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  // Puedes agregar más campos específicos según tus necesidades
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
