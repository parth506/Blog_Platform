const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser'); // To parse form data
const Post = require('./models/post'); // Import the Post model

const app = express();
const port = process.env.PORT || 3000; // Use environment variable for port

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/blog-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Error connecting to MongoDB:', err));

// Middleware
app.use(bodyParser.json()); // Parse JSON data in requests

// Routes

// Create a new post
app.post('/posts', async (req, res) => {
  const { title, content, author } = req.body; // Get data from request body
  try {
    const newPost = new Post({ title, content, author });
    await newPost.save();
    res.json({ message: 'Post created successfully!' });
  } catch (err) {
    console.error('Error creating post:', err);
    res.status(500).json({ message: 'Error creating post!' });
  }
});

// Get all posts
app.get('/posts', async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (err) {
    console.error('Error getting posts:', err);
    res.status(500).json({ message: 'Error getting posts!' });
  }
});

// Get a single post
app.get('/posts/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found!' });
    }
    res.json(post);
  } catch (err) {
    console.error('Error getting post:', err);
    res.status(500).json({ message: 'Error getting post!' });
  }
});

// Update a post (replace entire content)
app.put('/posts/:id', async (req, res) => {
  const { id } = req.params;
  const { title, content, author } = req.body; // Get updated data
  try {
    const post = await Post.findByIdAndUpdate(id, { title, content, author }, { new: true }); // Add { new: true } to return the updated post
    if (!post) {
      return res.status(404).json({ message: 'Post not found!' });
    }
    res.json(post);
  } catch (err) {
    console.error('Error updating post:', err);
    res.status(500).json({ message: 'Error updating post!' });
  }
});

// Delete a post
app.delete('/posts/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findByIdAndDelete(id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found!' });
    }
    res.json({ message: 'Post deleted successfully!' });
  } catch (err) {
    console.error('Error deleting post:', err);
    res.status(500).json({ message: 'Error deleting post!' });
  }
});

// Start the server
app.listen(port, () => console.log(Serverlisteningonport${port}));