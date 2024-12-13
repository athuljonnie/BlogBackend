const express = require('express');
const router = express.Router();
const postController = require('../controllers/post.controller');

router.get('/get-posts', postController.getAllPosts);

router.post('/save-post', postController.createPost);

router.get('/post', postController.findPost);

router.delete('/delete-post', postController.deletePost);

router.put('/post/:postId', postController.editPost);

// router.post('/trial-post', postController.trialPost);
module.exports = router;
