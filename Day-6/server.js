// Day 6 - Add Blog Tasks
// Goal: Create an API to add blog posts and store them in a JavaScript array

const express = require("express");

const app = express();
const PORT = 3000;

app.use(express.json());

// In-memory storage for blog posts
let blogs = [];
let nextId = 1;

// POST route - add a new blog post
app.post("/api/blogs", (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ message: "Title and content are required." });
  }

  const newBlog = {
    id: nextId++,
    title,
    content,
    createdAt: new Date().toISOString()
  };

  blogs.push(newBlog);
  res.status(201).json(newBlog);
});

// GET route - quick way to confirm blogs were stored (a proper view page comes on Day 7)
app.get("/api/blogs", (req, res) => {
  res.status(200).json(blogs);
});

app.listen(PORT, () => {
  console.log(`Server ready at http://localhost:${PORT}`);
  console.log("Blog posts can now be created via POST /api/blogs");
});