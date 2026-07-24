// Day 7 - View Blogs Tasks
// Goal: Display all blog posts on the Home page (backend unchanged from Day 6)

const express = require("express");

const app = express();
const PORT = 3000;

app.use(express.json());

let blogs = [
  { id: 1, title: "Welcome to My Blog", content: "This is the very first post on the site.", createdAt: new Date().toISOString() }
];
let nextId = 2;

app.get("/api/blogs", (req, res) => {
  res.status(200).json(blogs);
});

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

app.listen(PORT, () => {
  console.log(`Server ready at http://localhost:${PORT}`);
});