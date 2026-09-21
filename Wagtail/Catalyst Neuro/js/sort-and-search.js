let selectedCategory = "";

// Set kategori dan update tombol aktif
function setCategory(category) {
  selectedCategory = category;
  highlightActiveButton(category);
  filterPosts();
}

// Highlight tombol yang aktif
function highlightActiveButton(activeCategory) {
  const buttons = document.querySelectorAll(".filter-section button");

  buttons.forEach((btn) => {
    if (btn.textContent.trim() === activeCategory) {
      btn.classList.add("active-category");
    } else {
      btn.classList.remove("active-category");
    }
  });
}

// Filter post berdasarkan keyword dan kategori
function filterPosts() {
  const keyword = document.getElementById("searchInput").value.toLowerCase();
  const posts = document.querySelectorAll(".post-card");

  posts.forEach((post) => {
    const title = post.dataset.title.toLowerCase();
    const category = post.dataset.category;

    const matchSearch = title.includes(keyword);
    const matchCategory =
      selectedCategory === "" || category === selectedCategory;

    if (matchSearch && matchCategory) {
      post.classList.remove("hidden");
    } else {
      post.classList.add("hidden");
    }
  });
}
