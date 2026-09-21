const dropdowns = document.querySelectorAll(".dropdown");

dropdowns.forEach((dropdown) => {
  const button = dropdown.querySelector(".dropdown-toggle");
  const menu = dropdown.querySelector(".dropdown-menu");
  const icon = dropdown.querySelector(".dropdown-icon");

  button.addEventListener("click", function (e) {
    e.preventDefault();

    // Tutup semua dropdown lain
    dropdowns.forEach((d) => {
      if (d !== dropdown) {
        d.querySelector(".dropdown-toggle").classList.remove("active");
        d.querySelector(".dropdown-menu").classList.remove("show");
        d.querySelector(".dropdown-icon").classList.remove("active");
      }
    });

    // Toggle dropdown yang sedang diklik dan ubah rotasi ikon
    button.classList.toggle("active");
    menu.classList.toggle("show");
    icon.classList.toggle("active"); // Ini untuk memutar ikon
  });
});

// Klik di luar dropdown = tutup semua dropdown
document.addEventListener("click", function (e) {
  if (!e.target.closest(".dropdown")) {
    dropdowns.forEach((dropdown) => {
      dropdown.querySelector(".dropdown-toggle").classList.remove("active");
      dropdown.querySelector(".dropdown-menu").classList.remove("show");
      dropdown.querySelector(".dropdown-icon").classList.remove("active");
    });
  }
});
