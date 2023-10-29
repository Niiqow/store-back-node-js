const Product = require('../models/products');

// Agregar un nuevo producto
exports.addProduct = async (req, res) => {
  try {
    const { name, price, description, stock, category, imageUrl } = req.body;

    if (!name || !price || !category) {
      return res.status(400).json({ error: 'Se requieren campos obligatorios: nombre, precio y categoría' });
    }

    const newProduct = new Product({
      name,
      price,
      description,
      stock,
      category, // Asignar el ID de la categoría
      imageUrl
      // Puedes añadir más campos según el modelo definido
    });

    const savedProduct = await newProduct.save();

    res.status(201).json({ message: 'Producto agregado con éxito', product: savedProduct });
  } catch (error) {
    console.error('Error al agregar el producto:', error);
    res.status(500).json({ error: 'Error al agregar el producto' });
  }
};

// Listar todos los productos
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener la lista de productos' });
  }
};

// Obtener detalles de un producto específico
exports.getProductDetails = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    
    if (!product) {
      res.status(404).json({ error: 'Producto no encontrado' });
    } else {
      res.json(product);
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los detalles del producto' });
  }
};

// Actualizar información de un producto
exports.updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const { name, price, description, stock, category, imageUrl } = req.body;

    if (!name || !price || !category) {
      return res.status(400).json({ error: 'Se requieren campos obligatorios: nombre, precio y categoría' });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      { name, price, description, stock, category, imageUrl },
      { new: true }
    );

    if (!updatedProduct) {
      res.status(404).json({ error: 'Producto no encontrado' });
    } else {
      res.json({ message: 'Producto actualizado con éxito', product: updatedProduct });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el producto' });
  }
};

// Eliminar un producto
exports.deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    const deletedProduct = await Product.findByIdAndRemove(productId);

    if (!deletedProduct) {
      res.status(404).json({ error: 'Producto no encontrado' });
    } else {
      res.json({ message: 'Producto eliminado con éxito' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el producto' });
  }
};
