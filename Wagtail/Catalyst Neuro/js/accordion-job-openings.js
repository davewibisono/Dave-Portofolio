document.addEventListener("DOMContentLoaded", function () {
  const accordions = document.querySelectorAll(
    ".neuro-data-scientist .accordion"
  );

  accordions.forEach((accordion) => {
    accordion.addEventListener("click", function () {
      this.classList.toggle("active");

      const panel = this.nextElementSibling;
      const icon = this.querySelector(".accordion-toggle-icon");

      if (this.classList.contains("active")) {
        panel.style.maxHeight = panel.scrollHeight + "px";
        icon.classList.add("rotate");
      } else {
        panel.style.maxHeight = null;
        icon.classList.remove("rotate");
      }
    });
  });
});
