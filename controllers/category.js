const Category = require('../models/category');

// Obtener todas las categorías
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find().select('name');
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las categorías' });
  }
};

// Agregar una nueva categoría
exports.addCategory = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ error: 'Se requiere un nombre para la categoría' });
    }

    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      return res.status(400).json({ error: 'La categoría ya existe' });
    }

    const newCategory = new Category({ name });
    const savedCategory = await newCategory.save();
    res.status(201).json({ message: 'Categoría agregada con éxito', category: savedCategory });
  } catch (error) {
    console.error('Error al agregar la categoría:', error);
    res.status(500).json({ error: 'Error al agregar la categoría' });
  }
};

// Actualizar información de una categoría
exports.updateCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Se requiere un nombre para la categoría' });
    }

    const updatedCategory = await Category.findByIdAndUpdate(
      categoryId,
      { name },
      { new: true }
    );

    if (!updatedCategory) {
      res.status(404).json({ error: 'Categoría no encontrada' });
    } else {
      res.json({ message: 'Categoría actualizada con éxito', category: updatedCategory });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar la categoría' });
  }
};

exports.getCategoryDetails = async (req, res) => {
  try {
    const categoryId = req.params.id;

    const category = await Category.findById(categoryId);

    if (!category) {
      return res.status(404).json({ error: 'Categoría no encontrada' });
    }

    res.json(category);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los detalles de la categoría' });
  }
};

// Eliminar una categoría
exports.deleteCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;

    const deletedCategory = await Category.findByIdAndRemove(categoryId);

    if (!deletedCategory) {
      res.status(404).json({ error: 'Categoría no encontrada' });
    } else {
      res.json({ message: 'Categoría eliminada con éxito' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar la categoría' });
  }
};
