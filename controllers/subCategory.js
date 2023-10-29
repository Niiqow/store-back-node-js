const SubCategory = require('../models/subcategory');

// Obtener todas las subcategorías
exports.getAllSubCategories = async (req, res) => {
  try {
    const subcategories = await SubCategory.find();
    res.json(subcategories);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las subcategorías' });
  }
};

// Agregar una nueva subcategoría relacionada a una categoría
exports.addSubCategory = async (req, res) => {
  try {
    //console.log(req.body);
    const { name, category } = req.body; // Utilizar 'category' en lugar de 'categoryId'
    //console.log('Category ID:', category);

    const newSubCategory = new SubCategory({ name, category });
    const savedSubCategory = await newSubCategory.save();
    res.status(201).json({ message: 'Subcategoría agregada con éxito', subcategory: savedSubCategory });
  } catch (error) {
    //console.error('Error al agregar la subcategoría:', error);
    res.status(500).json({ error: 'Error al agregar la subcategoría' });
  }
};

// Obtener detalles de una subcategoría específica por su ID
exports.getSubCategoryDetails = async (req, res) => {
  try {
    const subCategoryId = req.params.id;
    const subcategory = await SubCategory.findById(subCategoryId);
    
    if (!subcategory) {
      res.status(404).json({ error: 'Subcategoría no encontrada' });
    } else {
      res.json(subcategory);
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los detalles de la subcategoría' });
  }
};

// Actualizar información de una subcategoría
exports.updateSubCategory = async (req, res) => {
  try {
    const subCategoryId = req.params.id;
    const { name, category } = req.body; // Utilizar 'category' en lugar de 'categoryId'

    const updatedSubCategory = await SubCategory.findByIdAndUpdate(
      subCategoryId,
      { name, category }, // Utilizar 'category' en lugar de 'categoryId'
      { new: true }
    );

    if (!updatedSubCategory) {
      res.status(404).json({ error: 'Subcategoría no encontrada' });
    } else {
      res.json({ message: 'Subcategoría actualizada con éxito', subcategory: updatedSubCategory });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar la subcategoría' });
  }
};

// Eliminar una subcategoría
exports.deleteSubCategory = async (req, res) => {
  try {
    const subCategoryId = req.params.id;

    const deletedSubCategory = await SubCategory.findByIdAndRemove(subCategoryId);

    if (!deletedSubCategory) {
      res.status(404).json({ error: 'Subcategoría no encontrada' });
    } else {
      res.json({ message: 'Subcategoría eliminada con éxito' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar la subcategoría' });
  }
};
