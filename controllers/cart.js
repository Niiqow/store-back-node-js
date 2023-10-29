const Cart = require('../models/cart');

// Agregar un producto al carrito
exports.addToCart = async (req, res) => {
  try {
    const userId = req.user._id; // El ID del usuario autenticado
    const productId = req.body.productId; // El ID del producto a agregar

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      // Si el usuario no tiene un carrito, crea uno
      const newCart = new Cart({ userId, products: [productId] });
      await newCart.save();
    } else {
      // Si el usuario ya tiene un carrito, agrega el producto si no está en la lista
      if (!cart.products.includes(productId)) {
        cart.products.push(productId);
        await cart.save();
      }
    }

    res.status(201).json({ message: 'Producto agregado al carrito con éxito' });
  } catch (error) {
    res.status(500).json({ error: 'Error al agregar el producto al carrito' });
  }
};

// Ver el contenido del carrito
exports.viewCart = async (req, res) => {
  try {
    const userId = req.user._id; // El ID del usuario autenticado
    const cart = await Cart.findOne({ userId }).populate('products');
    
    if (!cart) {
      res.json({ message: 'El carrito está vacío', products: [] });
    } else {
      res.json({ message: 'Carrito de compras', products: cart.products });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el carrito de compras' });
  }
};

// Realizar una compra
exports.purchase = async (req, res) => {
  try {
    const userId = req.user._id; // El ID del usuario autenticado
    const cart = await Cart.findOne({ userId });
    
    if (!cart || cart.products.length === 0) {
      res.status(400).json({ error: 'No hay productos en el carrito para comprar' });
    } else {
      // Aquí implementarías la lógica para procesar la compra, descontar el stock, generar una factura, etc.
      // Luego, vaciarías el carrito.
      cart.products = [];
      await cart.save();
      
      res.json({ message: 'Compra realizada con éxito' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al realizar la compra' });
  }
};
