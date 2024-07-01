const express = require('express');
const router = express.Router();
const imageController = require('../controllers/image.controller');

router.post('/upload-image', imageController.upload.single('image'), imageController.uploadImage);

module.exports = router;
