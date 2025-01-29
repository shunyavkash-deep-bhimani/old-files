var thumbnails = new Splide(".testimonial-img-content", {
  type: "fade",
  pagination: false,
  arrows: false,
});

var main = new Splide(".testimonial-content-wrapper", {
  arrows: false,
});

main.sync(thumbnails);
main.mount();
thumbnails.mount();
