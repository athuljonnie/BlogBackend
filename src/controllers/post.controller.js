const  Cheerio  = require('cheerio');
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
  const { title, content, description, keywords } = req.body;
  console.log(content);

  // Load the content into Cheerio
  const $ = Cheerio.load(content);

  // Find all <a> tags and add the required attributes
  $('a').each((i, elem) => {
    $(elem).attr('target', '_blank');
    $(elem).attr('rel', 'noopener noreferrer');
  });

  // Get the updated HTML content
  const updatedContent = $.html();

  try {
    const newPost = new Post({ title, content, description, keywords });
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    console.error('Error saving post:', error);
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
  const { id } = req.query;
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
  editPost,
};