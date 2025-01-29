document.addEventListener("DOMContentLoaded", function () {
  new Splide(".image-slider", {
    type: "loop",
    drag: "free",
    focus: "center",
    pagination: false,
    arrows: false,
    perPage: 3.5,
    autoScroll: {
      speed: 1,
    },
    breakpoints: {
      1099: {
        perPage: 3,
      },
      991: {
        perPage: 2.5,
      },
      767: {
        perPage: 2,
      },
      575: {
        perPage: 1.5,
      },
      479: {
        perPage: 1,
      },
    },
  }).mount(window.splide.Extensions);
});
