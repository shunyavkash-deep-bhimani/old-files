// <script src="https://rglhpcjp-5500.inc1.devtunnels.ms/css-js/createMe-js.js"></script>

document.addEventListener("DOMContentLoaded", () => {
  const SLIDE_DURATION = 8000;
  const PRELOAD_AT = 4000;
  let preloadTimeout = null;

  const gumletPlayers = new WeakMap();

  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

  /* ---------------- GUMLET LOADER ---------------- */

  function loadGumlet(wrapper) {
    if (!wrapper || wrapper.dataset.loaded) return;

    const iframe = document.createElement("iframe");
    iframe.src = wrapper.dataset.video;
    iframe.allow = "autoplay; fullscreen; picture-in-picture;";
    iframe.frameBorder = "0";

    const holder = document.createElement("div");
    holder.className = "iframe-holder";
    holder.appendChild(iframe);
    wrapper.appendChild(holder);
    wrapper.dataset.loaded = "true";

    const ph = wrapper.querySelector(".placeholder");
    if (ph) ph.style.opacity = "0";

    const player = new window.playerjs.Player(iframe);

    gumletPlayers.set(wrapper, {
      player,
      ready: false,
      queue: [],
      playToken: 0,
    });

    player.on("ready", () => {
      const state = gumletPlayers.get(wrapper);
      if (!state) return;
      state.ready = true;
      state.queue.forEach((fn) => fn());
      state.queue.length = 0;
    });

    // 🔑 start progress ONLY when video actually plays
    player.on("play", () => {
      startProgressForWrapper(wrapper);
    });
  }

  function withPlayer(wrapper, fn) {
    const state = gumletPlayers.get(wrapper);
    if (!state) return;
    if (state.ready) fn(state.player, state);
    else state.queue.push(() => fn(state.player, state));
  }

  /* ---------------- iOS SAFE START ---------------- */

  function forceStartFromZero(wrapper) {
    withPlayer(wrapper, (p, state) => {
      const token = ++state.playToken;

      const pause = () => {
        try {
          p.pause();
        } catch {}
      };
      const play = () => {
        try {
          p.play();
        } catch {}
      };
      const seek0 = () => {
        try {
          p.setCurrentTime(0);
        } catch {}
      };

      pause();
      play();

      setTimeout(() => token === state.playToken && seek0(), 120);
      setTimeout(() => token === state.playToken && seek0(), 260);
      setTimeout(() => token === state.playToken && play(), 380);

      if (isIOS) {
        let tries = 0;
        const retry = setInterval(() => {
          tries++;
          if (token !== state.playToken || tries > 6) {
            clearInterval(retry);
            return;
          }
          try {
            p.getCurrentTime((t) => {
              if (t > 0.15) {
                seek0();
                play();
              }
            });
          } catch {
            seek0();
          }
        }, 180);
      }
    });
  }

  /* ---------------- PLAY / PAUSE ---------------- */

  function playSlide(wrapper) {
    if (!wrapper) return;

    const type = wrapper.dataset.type;

    if (type === "native") {
      const video = wrapper.querySelector("video");
      if (!video) return;

      video.onplay = () => {
        startProgressForWrapper(wrapper);
      };

      video.pause();
      video.currentTime = 0;
      video.load();
      video.play().catch(() => {});
      return;
    }

    if (type === "gumlet") {
      loadGumlet(wrapper);
      forceStartFromZero(wrapper);
    }
  }

  function pauseSlide(wrapper) {
    if (!wrapper) return;

    const type = wrapper.dataset.type;

    if (type === "native") {
      const video = wrapper.querySelector("video");
      if (!video) return;

      video.pause();
      setTimeout(() => {
        video.pause();
        video.currentTime = 0;
        video.load();
      }, 800);
      return;
    }

    if (type === "gumlet") {
      withPlayer(wrapper, (p, state) => {
        state.playToken++;
        try {
          p.pause();
        } catch {}
      });
    }
  }

  /* ---------------- PRELOAD ---------------- */

  function scheduleNextPreload(index) {
    clearTimeout(preloadTimeout);
    preloadTimeout = setTimeout(() => {
      const slides = heroVideoSlider.Components.Slides.get();
      const next = (index + 1) % slides.length;
      const wrapper = slides[next].slide.querySelector(".video-slide");
      if (wrapper?.dataset.type === "gumlet") {
        loadGumlet(wrapper);
      }
    }, PRELOAD_AT);
  }

  /* ---------------- SPLIDE ---------------- */

  const heroVideoSlider = new Splide(".hero-video-slider", {
    type: "fade",
    rewind: true,
    arrows: false,
    pagination: true,
    autoplay: false,
    speed: 0,
  });

  const heroInnerSlider = new Splide(".hero-inner-slider", {
    type: "fade",
    arrows: false,
    speed: 0,
  });

  heroVideoSlider.on("mounted", () => {
    const slides = heroVideoSlider.Components.Slides.get();
    const firstWrapper = slides[0].slide.querySelector(".video-slide");

    if (firstWrapper?.dataset.type === "gumlet") {
      loadGumlet(firstWrapper);
    }

    playSlide(firstWrapper);
    scheduleNextPreload(0);

    setInterval(() => heroVideoSlider.go("+1"), SLIDE_DURATION);
  });

  heroVideoSlider.on("move", (newIdx, oldIdx) => {
    clearTimeout(preloadTimeout);

    function resetProgress() {
      dots.forEach((dot) => {
        const c = dot.querySelector(".progress");
        if (!c) return;
        c.style.transition = "none";
        c.style.strokeDashoffset = 63;
      });
    }

    // 🔑 RESET progress instantly when dot/slide changes
    resetProgress();

    const slides = heroVideoSlider.Components.Slides.get();
    const newWrapper = slides[newIdx].slide.querySelector(".video-slide");
    const oldWrapper = slides[oldIdx].slide.querySelector(".video-slide");

    pauseSlide(oldWrapper);
    playSlide(newWrapper);
    scheduleNextPreload(newIdx);
  });

  heroVideoSlider.sync(heroInnerSlider);
  heroInnerSlider.mount();
  heroVideoSlider.mount();

  /* ---------------- PROGRESS DOTS ---------------- */

  const dots = document.querySelectorAll(".splide__pagination__page");

  dots.forEach((dot) => {
    dot.innerHTML = `
      <svg viewBox="2 2 26 26">
        <circle class="bg" cx="16" cy="16" r="10"></circle>
        <circle class="progress" cx="16" cy="16" r="10"></circle>
      </svg>
    `;
  });

  function animateProgress(index) {
    dots.forEach((dot) => {
      const c = dot.querySelector(".progress");
      if (!c) return;
      c.style.transition = "none";
      c.style.strokeDashoffset = 63;
    });

    if (!dots[index]) return;
    void dots[index].offsetWidth;

    const active = dots[index].querySelector(".progress");
    if (!active) return;

    active.style.transition = `stroke-dashoffset ${SLIDE_DURATION}ms linear`;
    active.style.strokeDashoffset = 0;
  }

  function startProgressForWrapper(wrapper) {
    const slides = heroVideoSlider.Components.Slides.get();
    const index = slides.findIndex((s) => s.slide.querySelector(".video-slide") === wrapper);
    if (index !== -1) animateProgress(index);
  }

  /* ---------------- SAFETY ---------------- */

  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) return;
    const slides = heroVideoSlider.Components.Slides.get();
    slides.forEach((s) => pauseSlide(s.slide.querySelector(".video-slide")));
  });
});

// ---------------------------------------------------------------------------------------------------------------------------------

var video = document.getElementById("gumlet-player");
video.load();
var adapter = new playerjs.HTML5Adapter(video);
adapter.ready();
