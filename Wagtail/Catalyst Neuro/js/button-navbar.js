document.querySelectorAll(".dropdown").forEach((dropdown) => {
  const toggleButton = dropdown.querySelector(".btn");
  const menu = dropdown.querySelector(".dropdown-menu");

  let isInside = false;

  dropdown.addEventListener("mouseenter", () => {
    menu.classList.add("show");
    toggleButton.classList.add("active");
    isInside = true;
  });

  dropdown.addEventListener("mouseleave", () => {
    isInside = false;
    setTimeout(() => {
      if (!isInside) {
        menu.classList.remove("show");
        toggleButton.classList.remove("active");
      }
    }, 200); // jeda biar smooth
  });

  menu.addEventListener("mouseenter", () => {
    isInside = true;
  });

  menu.addEventListener("mouseleave", () => {
    isInside = false;
    setTimeout(() => {
      if (!isInside) {
        menu.classList.remove("show");
        toggleButton.classList.remove("active");
      }
    }, 200);
  });
});
