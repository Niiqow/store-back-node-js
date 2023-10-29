const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/category');

router.post('/add', categoryController.addCategory);
router.get('/list', categoryController.getAllCategories);
router.get('/details/:id', categoryController.getCategoryDetails);
router.put('/update/:id', categoryController.updateCategory);
router.delete('/delete/:id', categoryController.deleteCategory);

module.exports = router;
