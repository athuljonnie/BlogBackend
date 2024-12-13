const express = require('express');
const router = express.Router();

const controller =  require('../controllers/supportDocument.controller')

router.post('/categories', controller.addCategory);
router.get('/categories', controller.getCategories);
router.delete('/categories/:id', controller.deleteCategory);

router.post('/subcategories', controller.addSubCategory);
router.post('/get-subcategories', controller.getSubCategories);
router.delete('/subcategories/:categoryId/:subCategoryId', controller.deleteSubCategory);

router.post('/support-documents', controller.addSupportDocument);
router.get('/support-documents', controller.getAllSupportDocuments);
router.post('/get-docs-by-id', controller.getSupportDocumentbySubCategory);
router.post('/get-article', controller.getOneSupportDocument);

module.exports = router;
