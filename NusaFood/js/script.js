console.log("Hello world!");

const myName = "Jonas Schmedtmann";
const h1 = document.querySelector(".heading-primary");
console.log(myName);
console.log(h1);

// h1.addEventListener("click", function () {
//   h1.textContent = myName;
//   h1.style.backgroundColor = "red";
//   h1.style.padding = "5rem";
// });

///////////////////////////////////////////////////////////
// Set current year
const yearEl = document.querySelector(".year");
const currentYear = new Date().getFullYear();
yearEl.textContent = currentYear;

///////////////////////////////////////////////////////////
// Make mobile navigation work

const btnNavEl = document.querySelector(".btn-mobile-nav");
const headerEl = document.querySelector(".header");

btnNavEl.addEventListener("click", function () {
  headerEl.classList.toggle("nav-open");
});

///////////////////////////////////////////////////////////
// Smooth scrolling animation

const allLinks = document.querySelectorAll("a:link");

allLinks.forEach(function (link) {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const href = link.getAttribute("href");

    // Scroll back to the top
    if (href === "#")
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

    //Scroll to other links
    if (href !== "#" && href.startsWith("#")) {
      const sectionEl = document.querySelector(href);
      console.log(sectionEl);
      sectionEl.scrollIntoView({ behavior: "smooth" });
    }

    // Close mobile navigation
    if (link.classList.contains("main-nav-link"))
      headerEl.classList.toggle("nav-open");
  });
});

///////////////////////////////////////////////////////////
// Sticky navigation

const sectionHeroEl = document.querySelector(".section-hero");

const obs = new IntersectionObserver(
  function (entries) {
    const ent = entries[0];
    console.log(ent);

    if (ent.isIntersecting === false) {
      document.body.classList.add("sticky");
    }

    if (ent.isIntersecting === true) {
      document.body.classList.remove("sticky");
    }
  },
  {
    // In the viewport
    root: null,
    threshold: 0,
    rootMargin: "-80px",
  }
);
obs.observe(sectionHeroEl);

///////////////////////////////////////////////////////////
// Fixing flexbox gap property missing in some Safari versions
function checkFlexGap() {
  var flex = document.createElement("div");
  flex.style.display = "flex";
  flex.style.flexDirection = "column";
  flex.style.rowGap = "1px";

  flex.appendChild(document.createElement("div"));
  flex.appendChild(document.createElement("div"));

  document.body.appendChild(flex);
  var isSupported = flex.scrollHeight === 1;
  flex.parentNode.removeChild(flex);
  console.log(isSupported);

  if (!isSupported) document.body.classList.add("no-flexbox-gap");
}
checkFlexGap();

// https://unpkg.com/smoothscroll-polyfill@0.4.4/dist/smoothscroll.min.js

/*
.no-flexbox-gap .main-nav-list li:not(:last-child) {
  margin-right: 4.8rem;
}

.no-flexbox-gap .list-item:not(:last-child) {
  margin-bottom: 1.6rem;
}

.no-flexbox-gap .list-icon:not(:last-child) {
  margin-right: 1.6rem;
}

.no-flexbox-gap .delivered-faces {
  margin-right: 1.6rem;
}

.no-flexbox-gap .meal-attribute:not(:last-child) {
  margin-bottom: 2rem;
}

.no-flexbox-gap .meal-icon {
  margin-right: 1.6rem;
}

.no-flexbox-gap .footer-row div:not(:last-child) {
  margin-right: 6.4rem;
}

.no-flexbox-gap .social-links li:not(:last-child) {
  margin-right: 2.4rem;
}

.no-flexbox-gap .footer-nav li:not(:last-child) {
  margin-bottom: 2.4rem;
}

@media (max-width: 75em) {
  .no-flexbox-gap .main-nav-list li:not(:last-child) {
    margin-right: 3.2rem;
  }
}

@media (max-width: 59em) {
  .no-flexbox-gap .main-nav-list li:not(:last-child) {
    margin-right: 0;
    margin-bottom: 4.8rem;
  }
}
*/

// ==============================
// FOOD FILTERS, SEARCH & SORT
// ==============================

const searchInput = document.getElementById("search-meal");
const filterBtns = document.querySelectorAll(".filter-btn");
const spiceFilter = document.getElementById("spice-filter");
const sortRating = document.getElementById("sort-rating");
const mealsContainer = document.getElementById("meals-container");
const meals = document.querySelectorAll(".meal");
const loadMoreBtn = document.getElementById("load-more");

const STEP = 3;
let visibleCount = STEP;
let activeFilter = "all";

const ALL_MEALS = Array.from(meals);

// ------------------------------
// FILTER + SEARCH
// ------------------------------
function filterMeals() {
  const searchValue = searchInput.value.toLowerCase();
  const selectedSpice = spiceFilter.value;

  meals.forEach((meal) => {
    const title = meal.querySelector(".meal-title").textContent.toLowerCase();
    const category = meal.dataset.category;
    const spice = meal.dataset.spice;

    const matchSearch = title.includes(searchValue);
    const matchCategory = activeFilter === "all" || category === activeFilter;
    const matchSpice = selectedSpice === "all" || spice === selectedSpice;

    meal.style.display =
      matchSearch && matchCategory && matchSpice ? "block" : "none";
  });

  visibleCount = STEP;
  updateVisibleMeals();
}

// ------------------------------
// LOAD MORE
// ------------------------------
function updateVisibleMeals() {
  let shown = 0;

  ALL_MEALS.forEach((meal) => {
    if (meal.style.display === "none") return;

    if (shown < visibleCount) {
      meal.classList.remove("hidden");
      shown++;
    } else {
      meal.classList.add("hidden");
    }
  });

  const totalVisible = ALL_MEALS.filter(
    (meal) => meal.style.display !== "none"
  ).length;

  loadMoreBtn.style.display =
    totalVisible > STEP ? "inline-block" : "none";

  loadMoreBtn.textContent =
    visibleCount >= totalVisible
      ? "Close all recipes ←"
      : "See all recipes →";
}

loadMoreBtn.addEventListener("click", (e) => {
  e.preventDefault();

  const totalVisible = ALL_MEALS.filter(
    (meal) => meal.style.display !== "none"
  ).length;

  visibleCount =
    visibleCount >= totalVisible ? STEP : visibleCount + STEP;

  updateVisibleMeals();
});

// ------------------------------
// EVENTS
// ------------------------------
searchInput.addEventListener("input", filterMeals);

filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    activeFilter = btn.dataset.filter;
    filterMeals();
  });
});

spiceFilter.addEventListener("change", filterMeals);

sortRating.addEventListener("change", () => {
  const mealsArray = [...ALL_MEALS];

  if (sortRating.value === "high")
    mealsArray.sort((a, b) => b.dataset.rating - a.dataset.rating);

  if (sortRating.value === "low")
    mealsArray.sort((a, b) => a.dataset.rating - b.dataset.rating);

  mealsArray.forEach((meal) => mealsContainer.appendChild(meal));
  updateVisibleMeals();
});

// INIT
updateVisibleMeals();
