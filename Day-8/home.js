// Day 8 - View blogs and allow editing existing posts

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

    blogList.innerHTML = blogs.map(renderBlogCard).join("");
    attachEditListeners();
  } catch (error) {
    blogList.innerHTML = "<p>Could not load blogs. Is the server running?</p>";
    console.error("Error fetching blogs:", error);
  }
}

function renderBlogCard(blog) {
  return `
    <div class="blog-card" data-id="${blog.id}">
      <h3 class="blog-title">${blog.title}</h3>
      <p class="blog-content">${blog.content}</p>
      <button class="btn-edit" data-id="${blog.id}">Edit</button>
    </div>
  `;
}

function attachEditListeners() {
  document.querySelectorAll(".btn-edit").forEach((button) => {
    button.addEventListener("click", () => openEditForm(button.dataset.id));
  });
}

function openEditForm(id) {
  const card = document.querySelector(`.blog-card[data-id="${id}"]`);
  const currentTitle = card.querySelector(".blog-title").textContent;
  const currentContent = card.querySelector(".blog-content").textContent;

  card.innerHTML = `
    <input type="text" class="edit-title" value="${currentTitle}" />
    <textarea class="edit-content" rows="4">${currentContent}</textarea>
    <button class="btn-primary btn-save" data-id="${id}">Save</button>
  `;

  card.querySelector(".btn-save").addEventListener("click", () => saveBlog(id, card));
}

async function saveBlog(id, card) {
  const title = card.querySelector(".edit-title").value.trim();
  const content = card.querySelector(".edit-content").value.trim();

  if (!title || !content) {
    alert("Title and content cannot be empty.");
    return;
  }

  try {
    await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content })
    });

    loadBlogs();
  } catch (error) {
    console.error("Error updating blog:", error);
  }
}

document.addEventListener("DOMContentLoaded", loadBlogs);