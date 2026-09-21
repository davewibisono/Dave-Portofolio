// Data post tambahan (bisa kamu tambah lagi)
const morePosts = [
  {
    title: "How to Stay Motivated",
    category: "Category 2",
    date: "24 JUNE 2023 ● 4 MIN READ",
    img: "imgg/post-9.png",
  },
  {
    title: "Mastering Time Management",
    category: "Category 3",
    date: "25 JUNE 2023 ● 5 MIN READ",
    img: "imgg/post-1.png",
  },
  {
    title: "Building a Personal Brand Online",
    category: "Category 4",
    date: "26 JUNE 2023 ● 4 MIN READ",
    img: "imgg/post-2.png",
  },
  // Tambah lagi di sini kalau mau
];

let currentIndex = 0;

function loadMorePosts() {
  const container = document.getElementById("postsContainer");

  const nextPosts = morePosts.slice(currentIndex, currentIndex + 3);
  nextPosts.forEach((post) => {
    const card = document.createElement("div");
    card.classList.add("post-card");
    card.setAttribute("data-title", post.title);
    card.setAttribute("data-category", post.category);

    card.innerHTML = `
      <img src="${post.img}" class="post-image">
      <div class="post-content">
        <span class="badge text-uppercase">${post.category}</span>
        <h3 class="post-title">${post.title}</h3>
        <p class="post-date">${post.date}</p>
        <a href="#" class="btn-read-more">
          <div class="read-more d-flex flex-row text-uppercase align-items-center">
            Read More
            <ion-icon name="chevron-forward-outline" class="ms-1"></ion-icon>
          </div>
        </a>
      </div>
    `;

    container.appendChild(card);
  });

  currentIndex += 3;

  // Sembunyikan tombol kalau post habis
  if (currentIndex >= morePosts.length) {
    document.querySelector(".more-blog").style.display = "none";
  }

  // Re-filter ulang sesuai kategori/search yang aktif
  filterPosts();
}

document.querySelector(".more-blog").addEventListener("click", loadMorePosts);
