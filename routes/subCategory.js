const express = require('express');
const router = express.Router();
const subCategoryController = require('../controllers/subCategory');

router.post('/add', subCategoryController.addSubCategory);
router.get('/list', subCategoryController.getAllSubCategories);
router.get('/details/:id', subCategoryController.getSubCategoryDetails);
router.put('/update/:id', subCategoryController.updateSubCategory);
router.delete('/delete/:id', subCategoryController.deleteSubCategory);

module.exports = router;
