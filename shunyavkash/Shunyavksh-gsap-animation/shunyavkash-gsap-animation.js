// <script src="http://127.0.0.1:5500/shunyavkash-gsap-animation.js"></script>

// let loopTl = gsap.timeline({ repeat: -1, yoyo: true });
// loopTl.to(".hero-img-wrapper", {
//   y: "-0.5rem",
//   duration: 1,
//   ease: "power1.inOut",
//   pushed: true,
// });

let loadTl = gsap.timeline();
loadTl.from(".hero-title", { opacity: 0, y: "6rem", duration: 1 });
loadTl.from(".hero-description", { opacity: 0, y: "6rem", duration: 1 });
loadTl.from(".hero-img-wrapper", { opacity: 0, y: "1rem", duration: 1 });
// loadTl.from(
//   ".hero-img-wrapper",
//   { opacity: 0, scale: 0.8, duration: 1.5, onComplete: loopTl.play() },
//   ">-0.5"
// );

const buttons = gsap.utils.toArray(".simple-primary-btn");
buttons.forEach((button) => {
  let span = button.querySelector("span");
  let tl = gsap.timeline({ paused: true });

  tl.to(span, { duration: 0.2, yPercent: -150, ease: "power2.in" });
  tl.set(span, { yPercent: 150 });
  tl.to(span, { duration: 0.2, yPercent: 0 });

  button.addEventListener("mouseenter", () => tl.play(0));
});
