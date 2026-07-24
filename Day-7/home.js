// Day 7 - Fetch and display all blogs on the Home page

const API_URL = "http://localhost:3000/api/blogs";

async function loadBlogs() {
  const blogList = document.getElementById("blogList");

  try {
    const response = await fetch(API_URL);
    const blogs = await response.json();

    if (blogs.length === 0) {
      blogList.innerHTML = "<p>No blogs yet. Be the first to add one!</p>";
      return;
    }

    blogList.innerHTML = blogs
      .map(
        (blog) => `
        <div class="blog-card">
          <h3>${blog.title}</h3>
          <p>${blog.content}</p>
        </div>
      `
      )
      .join("");
  } catch (error) {
    blogList.innerHTML = "<p>Could not load blogs. Is the server running?</p>";
    console.error("Error fetching blogs:", error);
  }
}

document.addEventListener("DOMContentLoaded", loadBlogs);