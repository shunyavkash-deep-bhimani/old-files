document.addEventListener("DOMContentLoaded", () => {
  const SLIDE_DURATION = 8000; // 8s per slide
  const PRELOAD_AT = 4000; // preload next at 5s
  let preloadTimeout = null;

  function loadVimeo(wrapper) {
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

    // Once iframe is there, we can hide placeholder immediately
    const ph = wrapper.querySelector(".placeholder");
    if (ph) ph.style.opacity = "0";
  }

  function playSlide(wrapper) {
    if (!wrapper) return;
    const type = wrapper.dataset.type;

    if (type === "native") {
      const video = wrapper.querySelector("video");
      if (!video) return;
      // start from 0 then play
      try {
        video.currentTime = 0;
      } catch (e) {}
      video.play().catch(() => {});
      const ph = wrapper.querySelector(".placeholder");
      if (ph) ph.style.opacity = "0";
    } else if (type === "vimeo") {
      const iframe = wrapper.querySelector("iframe");
      if (!iframe) return;
      // Ask Vimeo to seek to 0 then play
      try {
        iframe.contentWindow.postMessage({ method: "setCurrentTime", value: 0 }, "*");
      } catch (e) {}
      // small delay helps ensure seek is processed before play
      setTimeout(() => {
        try {
          iframe.contentWindow.postMessage({ method: "play" }, "*");
        } catch (e) {}
      }, 80);
      const ph = wrapper.querySelector(".placeholder");
      if (ph) ph.style.opacity = "0";
    }
  }

  function pauseSlide(wrapper) {
    if (!wrapper) return;
    const type = wrapper.dataset.type;

    if (type === "native") {
      const video = wrapper.querySelector("video");
      if (!video) return;
      video.pause();
      try {
        video.currentTime = 0;
      } catch (e) {}
    } else if (type === "vimeo") {
      const iframe = wrapper.querySelector("iframe");
      if (!iframe) return;
      try {
        // pause then reset to 0 so next play starts from beginning
        iframe.contentWindow.postMessage({ method: "pause" }, "*");
        // small delay to ensure pause is processed
        setTimeout(() => {
          try {
            iframe.contentWindow.postMessage({ method: "setCurrentTime", value: 0 }, "*");
          } catch (e) {}
        }, 80);
      } catch (e) {}
    }
  }

  const heroVideoSlider = new Splide(".hero-video-slider", {
    type: "fade",
    rewind: true,
    arrows: false,
    pagination: false,
    autoplay: false,
    speed: 0,
  });

  var heroInnerSlider = new Splide(".hero-inner-slider", {
    type: "fade",
    arrows: false,
    speed: 0,
  });

  function scheduleNextPreload(currentIndex) {
    clearTimeout(preloadTimeout);

    preloadTimeout = setTimeout(() => {
      const slides = heroVideoSlider.Components.Slides.get();
      const nextIdx = (currentIndex + 1) % slides.length;
      const nextWrapper = slides[nextIdx].slide.querySelector(".video-slide");

      if (nextWrapper && nextWrapper.dataset.type === "vimeo") {
        loadVimeo(nextWrapper);
      }
    }, PRELOAD_AT);
  }

  heroVideoSlider.on("mounted", () => {
    const slides = heroVideoSlider.Components.Slides.get();

    // First slide wrapper
    const firstWrapper = slides[0].slide.querySelector(".video-slide");

    // For native: nothing to preload; for vimeo we'd call loadVimeo
    if (firstWrapper && firstWrapper.dataset.type === "vimeo") {
      loadVimeo(firstWrapper);
    }

    playSlide(firstWrapper);
    scheduleNextPreload(0);

    // Manual autoplay using interval
    setInterval(() => heroVideoSlider.go("+1"), SLIDE_DURATION);
  });

  heroVideoSlider.on("move", (newIdx, oldIdx) => {
    clearTimeout(preloadTimeout);

    const slides = heroVideoSlider.Components.Slides.get();
    const newWrapper = slides[newIdx].slide.querySelector(".video-slide");
    const oldWrapper = slides[oldIdx].slide.querySelector(".video-slide");

    if (newWrapper && newWrapper.dataset.type === "vimeo") {
      loadVimeo(newWrapper);
    }

    // Ensure new slide starts from 0
    playSlide(newWrapper);
    // Pause and reset previous slide to 0
    pauseSlide(oldWrapper);

    scheduleNextPreload(newIdx);
  });

  heroVideoSlider.sync(heroInnerSlider);
  heroInnerSlider.mount();
  heroVideoSlider.mount();

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

  // Animate on start and slide change
  heroVideoSlider.on("mounted move", () => {
    animateProgress(heroVideoSlider.index);
  });

  setTimeout(() => {
    animateProgress(0);
  }, 20);
});

document.addEventListener("DOMContentLoaded", function () {
  setTimeout(() => {
    const heroSection = document.querySelector(".hero-section-poster");

    if (heroSection) {
      heroSection.style.opacity = "0";

      setTimeout(() => {
        heroSection.style.display = "none";
        heroSection.style.opacity = "1";
      }, 500); // match CSS transition
    }
  }, 5000);
});
