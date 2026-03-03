const express = require('express');
const router = express.Router();

// Mock database
let blogs = [];

// Create a new blog post
router.post('/', (req, res) => {
    const newBlog = {
        id: blogs.length + 1,
        title: req.body.title,
        content: req.body.content,
        createdAt: new Date()
    };
    blogs.push(newBlog);
    res.status(201).json(newBlog);
});

// Read all blog posts
router.get('/', (req, res) => {
    res.json(blogs);
});

// Read a single blog post by ID
router.get('/:id', (req, res) => {
    const blog = blogs.find(b => b.id === parseInt(req.params.id));
    if (!blog) return res.status(404).send('Blog not found');
    res.json(blog);
});

// Update an existing blog post by ID
router.put('/:id', (req, res) => {
    const blog = blogs.find(b => b.id === parseInt(req.params.id));
    if (!blog) return res.status(404).send('Blog not found');
    blog.title = req.body.title;
    blog.content = req.body.content;
    res.json(blog);
});

// Delete a blog post by ID
router.delete('/:id', (req, res) => {
    const blogIndex = blogs.findIndex(b => b.id === parseInt(req.params.id));
    if (blogIndex === -1) return res.status(404).send('Blog not found');
    blogs.splice(blogIndex, 1);
    res.status(204).send();
});

// AI Content Generation Endpoint (Mock)
router.post('/generate', (req, res) => {
    // In a real application, this would call an AI generation service.
    const generatedContent = `Generated content for: ${req.body.title}`;
    res.json({ content: generatedContent });
});

module.exports = router;