document.addEventListener("DOMContentLoaded", function () {
  const accordions = document.querySelectorAll(".nwb-guide .accordion");

  accordions.forEach((accordion) => {
    accordion.addEventListener("click", function () {
      // Toggle kelas 'active'
      this.classList.toggle("active");

      // Ambil panel di bawahnya
      const panel = this.nextElementSibling;

      // Expand/collapse panel
      if (this.classList.contains("active")) {
        panel.style.maxHeight = panel.scrollHeight + "px";
      } else {
        panel.style.maxHeight = null;
      }
    });
  });
});
