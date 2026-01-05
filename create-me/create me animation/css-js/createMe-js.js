// <script src="https://rglhpcjp-5500.inc1.devtunnels.ms/css-js/createMe-js.js"></script>

document.addEventListener("DOMContentLoaded", () => {
  const SLIDE_DURATION = 24000; // 8 seconds
  let autoplayTimer = null;

  const wrapper = document.querySelector(".video-slide");
  if (!wrapper) return;

  /* --------------------------------
     Vimeo lazy load
  -------------------------------- */
  function loadVimeo() {
    if (wrapper.dataset.loaded) return;

    const iframe = document.createElement("iframe");
    iframe.src = wrapper.dataset.video;
    iframe.allow = "autoplay; fullscreen";
    iframe.frameBorder = "0";
    iframe.allowFullscreen = true;

    const holder = document.createElement("div");
    holder.className = "iframe-holder";
    holder.appendChild(iframe);

    wrapper.appendChild(holder);
    wrapper.dataset.loaded = "true";

    let player = new Vimeo.Player(iframe);
    player.on("loaded", () => {
      console.log("Vimeo: metadata loaded");
      const ph = wrapper.querySelector(".placeholder");
      if (ph) ph.style.opacity = "0";

      heroInnerSlider.Components.Autoplay.play();

      // Replace pagination dots with SVG radial progress
      const dots = document.querySelectorAll(".splide__pagination__page");
      dots.forEach((dot) => {
        dot.innerHTML = `
      <svg viewBox="2 2 26 26">
        <circle class="bg" cx="16" cy="16" r="10"></circle>
        <circle class="progress" cx="16" cy="16" r="10"></circle>
  </svg>
    `;
      });

      // Function to animate radial progress
      function animateProgress(index) {
        dots.forEach((dot) => {
          const circle = dot.querySelector(".progress");
          circle.style.transition = "none";
          circle.style.strokeDashoffset = 63; // reset to 0%
        });

        // Trigger reflow
        void dots[index].offsetWidth;

        const activeCircle = dots[index].querySelector(".progress");
        activeCircle.style.transition = `stroke-dashoffset ${SLIDE_DURATION}ms linear`;
        activeCircle.style.strokeDashoffset = 0; // fill to 100%
      }
    });

    const ph = wrapper.querySelector(".placeholder");
    if (ph) ph.style.opacity = "0";
  }

  /* --------------------------------
     Play / Pause
  -------------------------------- */
  function playVideo() {
    if (wrapper.dataset.type === "native") {
      const video = wrapper.querySelector("video");
      if (!video) return;

      try {
        video.currentTime = 0;
      } catch (e) {}

      video.play().catch(() => {});
    }

    if (wrapper.dataset.type === "vimeo") {
      const iframe = wrapper.querySelector("iframe");
      if (!iframe) return;

      try {
        iframe.contentWindow.postMessage({ method: "setCurrentTime", value: 0 }, "*");
      } catch (e) {}

      setTimeout(() => {
        try {
          iframe.contentWindow.postMessage({ method: "play" }, "*");
        } catch (e) {}
      }, 80);
    }
  }

  function pauseVideo() {
    if (wrapper.dataset.type === "native") {
      const video = wrapper.querySelector("video");
      if (!video) return;

      video.pause();
      try {
        video.currentTime = 0;
      } catch (e) {}
    }

    if (wrapper.dataset.type === "vimeo") {
      const iframe = wrapper.querySelector("iframe");
      if (!iframe) return;

      try {
        iframe.contentWindow.postMessage({ method: "pause" }, "*");
        setTimeout(() => {
          iframe.contentWindow.postMessage({ method: "setCurrentTime", value: 0 }, "*");
        }, 80);
      } catch (e) {}
    }
  }

  /* --------------------------------
     Autoplay loop
  -------------------------------- */
  function startAutoplay() {
    clearInterval(autoplayTimer);

    autoplayTimer = setInterval(() => {
      pauseVideo();
      playVideo();
    }, SLIDE_DURATION);
  }

  /* --------------------------------
     Init
  -------------------------------- */
  if (wrapper.dataset.type === "vimeo") {
    loadVimeo();
  }

  playVideo();
  startAutoplay();

  /* --------------------------------
     Pause when tab hidden
  -------------------------------- */
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      pauseVideo();
      clearInterval(autoplayTimer);
    } else {
      playVideo();
      startAutoplay();
    }
  });
});

var heroInnerSlider = new Splide(".hero-inner-slider", {
  type: "loop",
  arrows: false,
  speed: 0,
  autoplay: false,
  interval: 8000,
});

heroInnerSlider.mount();
