const Post = require('../models/BlogPost');

// GET all posts
const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts); // Send JSON response with fetched posts
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
};

// POST new post
const createPost = async (req, res) => {
  const { title, content, description } = req.body;
console.log(req.body)
  try {
    const newPost = new Post({ title, content, description });
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    console.error('Error saving post:', error);
    res.status(500).json({ error: 'Failed to save post' });
  }
};

const findPost = async (req, res) => {
  const { id } = req.query; // Extract id from query parameters
  console.log(id)
  try {
    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    res.json(post);
  } catch (error) {
    console.error('Error fetching post:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deletePost = async (req, res) => {
  const { id } = req.query; // Extract id from query parameters
  console.log(id);

  try {
    const post = await Post.findByIdAndDelete(id);

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error('Error deleting post:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const editPost = async(req, res) => {
  const { postId } = req.params;
  console.log("backend")
  const { title, description, content, rawContent } = req.body;

  try {
    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      {
        title,
        description,
        content,
        rawContent,
      },
      { new: true }
    );

    if (!updatedPost) {
      return res.status(404).json({ error: 'Post not found' });
    }

    res.status(200).json(updatedPost);
  } catch (error) {
    console.error('Error updating post:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = {
  getAllPosts,
  createPost,
  findPost, 
  deletePost,
  editPost
};