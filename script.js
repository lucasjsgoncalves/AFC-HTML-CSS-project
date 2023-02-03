const times = document.querySelector(".images_qbs");
const players = document.querySelectorAll(".imgs-players-link");

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
