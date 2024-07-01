const express = require('express');
const router = express.Router();
const newsController = require('../controllers/newsUpdate.controller')
const multer = require('multer');
const NewsUpdate = require('../models/NewsUpdate');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    }
  });
  
  const upload = multer({ storage });

router.post('/create-news', upload.single('image'),newsController.createNews);

router.get('/get-news', newsController.getNewsUpdate);

router.get('/get-a-news', newsController.getANews);

router.put('/edit-news', upload.single('image'), newsController.editNews);

router.delete('/delete-news', newsController.deleteNews);

module.exports = router;
