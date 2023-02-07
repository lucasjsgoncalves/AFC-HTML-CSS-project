const times = document.querySelector(".images_qbs");
const players = document.querySelectorAll(".imgs-players-link");
const btnNavEl = document.querySelector(".btn-mobile-nav");
const headerEl = document.querySelector(".header");
const allLinks = document.querySelectorAll("a:link");
const sectionHeroEl = document.querySelector(".section-hero");
const navList = document.querySelector(".main-nav-list");

// Overlay section teams
times.addEventListener("mouseout", function (e) {
  players.forEach((el) => {
    el.classList.remove("grey-out");
  });
});

times.addEventListener("mouseover", function (e) {
  if (!e.target.closest(".imgs-players-link")) return;

  players.forEach((el) => {
    if (el.dataset !== e.target.closest(".imgs-players-link").dataset) {
      el.classList.add("grey-out");
    }
  });
});

// Mobile nav

btnNavEl.addEventListener("click", function () {
  document.querySelector(".images_qbs").classList.toggle("opacity");

  headerEl.classList.toggle("nav-open");
});

//Smooth scrolling animação

allLinks.forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const href = link.getAttribute("href");
    if (href === "#")
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

    if (href.length > 1 && href.startsWith("#")) {
      document.querySelector(href).scrollIntoView({ behavior: "smooth" });
    }
  });
});
// Fechando mobile nav

navList.addEventListener("click", function (e) {
  if (!e.target.classList.contains("main-nav-link")) return;

  if (headerEl.classList.contains("nav-open")) {
    document.querySelector(".images_qbs").classList.remove("opacity");
  }

  headerEl.classList.toggle("nav-open");
});

// Sticky nav
const observer = new IntersectionObserver(
  function (entries) {
    const entry = entries[0];
    if (!entry.isIntersecting) {
      document.body.classList.add("sticky");
    }
    if (entry.isIntersecting) {
      document.body.classList.remove("sticky");
    }
  },

  {
    root: null,
    threshold: 0,
    rootMargin: "-80px",
  }
);

observer.observe(sectionHeroEl);

// Revelar seções com scroll
const allSections = document.querySelectorAll("section");

const revealSection = function (entries, observer) {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.remove("section--hidden");
    observer.unobserve(entry.target);
  });
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.1,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);

  if (!section.classList.contains("section-hero")) {
    section.classList.add("section--hidden");
  }
});

// Lazy loading images
const imgTargets = document.querySelectorAll("img[data-src]");

const loadImg = function (entries, observer) {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.src = entry.target.dataset.src;
    entry.target.addEventListener("load", function () {
      entry.target.classList.remove("lazy-img");
    });
  });
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: "+200px",
});

imgTargets.forEach((img) => imgObserver.observe(img));
