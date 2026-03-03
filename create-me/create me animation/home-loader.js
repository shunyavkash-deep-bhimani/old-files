// Disable browser automatic scroll restoration
if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}

// Force scroll to top multiple times to prevent override
function forceScrollTop() {
  window.scrollTo(0, 0);
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
}

// Immediately
forceScrollTop();

// After DOM ready
document.addEventListener("DOMContentLoaded", forceScrollTop);

// After full load
window.addEventListener("load", () => {
  forceScrollTop();

  // Small delay fix (for iframe/layout shifts)
  setTimeout(forceScrollTop, 50);
});

document.addEventListener("DOMContentLoaded", () => {
  const split = new SplitText(".hero-slider-section .hero-title", {
    type: "lines",
  });

  // Wrap each line with a div
  split.lines.forEach((line) => {
    const wrapper = document.createElement("div");
    wrapper.classList.add("hero-line-wrapper");

    line.parentNode.insertBefore(wrapper, line);
    wrapper.appendChild(line);

    const overlay = document.createElement("div");
    overlay.classList.add("hero-animation-line");
    wrapper.appendChild(overlay);
  });

  // =========================================================
  // BODY OVERFLOW LOCK
  // =========================================================
  function lockBodyScroll() {
    const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.documentElement.style.setProperty("--scrollbar-width", scrollBarWidth + "px");
    document.documentElement.style.overflow = "hidden";
    document.body.classList.add("overlay-lock");
  }

  function unlockBodyScroll() {
    document.body.classList.remove("overlay-lock");
    document.documentElement.style.removeProperty("--scrollbar-width");
    document.documentElement.style.overflow = "";
  }

  lockBodyScroll();

  const tl = gsap.timeline();

  tl.to(".hero-slider-section .hero-title", {
    zIndex: 1,
  });

  tl.to(".hero-animation-logo-content", {
    opacity: 1,
    duration: 0.7,
  });

  tl.to(".hero-animation-line", {
    width: "0%",
    duration: 1.05,
    stagger: 1.05,
    delay: 0.4,
  });

  tl.to(".hero-animation-logo-content", {
    opacity: 0,
    duration: 0.5,
    zIndex: -1,
    delay: 1,
  });

  tl.to(
    ".hero-animation-overlay",
    {
      opacity: 0,
      duration: 0.5,
      zIndex: -1,
      onComplete: () => {
        unlockBodyScroll();
      },
    },
    "<",
  );

  /* =========================================================
 SPLIDE
========================================================= */
  const heroInnerSlider = new Splide(".hero-inner-slider", {
    type: "fade",
    arrows: false,
    speed: 800,
    autoplay: false,
    interval: 8000,
  });
  heroInnerSlider.mount();

  /* =========================================================
 VIMEO + RING SYNC - COMPLETE REWRITE FOR CROSS-BROWSER
========================================================= */

  const SEGMENT_DURATION = 8.042;
  const SEGMENT_COUNT = 3;
  const TOTAL_DURATION = SEGMENT_DURATION * SEGMENT_COUNT;

  const FULL_OFFSET = 0;
  const EMPTY_OFFSET = 63;

  const wrapper = document.querySelector(".video-slide");
  if (!wrapper) return;

  // Core state
  let player = null;
  let dots = [];
  let currentSegment = 0;

  // Playback state
  let isPlaying = false;
  let isBuffering = false;
  let hasEnded = false;
  let introDone = false;
  let playerReady = false;

  // Time tracking
  let currentTime = 0;
  let lastUpdateTime = 0;

  // RAF
  let rafId = null;

  // Force sync flag for Safari
  let needsForceSync = false;

  function tryStartVideo() {
    if (introDone && playerReady && player) {
      player.setVolume(0).catch(() => {});

      // Small delay for Safari
      setTimeout(() => {
        player.play().catch((err) => {
          console.warn("Vimeo play blocked:", err);
        });
      }, 100);
    }
  }

  function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
  }

  // =========================================================
  // UI UPDATE FUNCTIONS
  // =========================================================

  function updateDotsFromTime(seconds) {
    // Handle ended state
    if (hasEnded || seconds >= TOTAL_DURATION - 0.05) {
      // Force first segment on ended/restart
      updateUISegment(0);
      updateRingProgress(0, 0);
      return;
    }

    // Calculate current segment
    const segment = Math.floor(seconds / SEGMENT_DURATION);
    const clampedSegment = clamp(segment, 0, SEGMENT_COUNT - 1);

    // Calculate progress within segment
    const segmentStart = clampedSegment * SEGMENT_DURATION;
    const segmentProgress = clamp((seconds - segmentStart) / SEGMENT_DURATION, 0, 1);

    // Update UI
    updateUISegment(clampedSegment);
    updateRingProgress(clampedSegment, segmentProgress);
  }

  function updateUISegment(segment) {
    if (!dots.length) return;

    // Only update if changed
    if (segment === currentSegment && !hasEnded) return;

    currentSegment = segment;

    // Update Splide slider (only if different)
    if (heroInnerSlider.index !== segment) {
      heroInnerSlider.go(segment);
    }

    // Update dot active states
    dots.forEach((dot, index) => {
      const isActive = index === segment;
      dot.classList.toggle("is-active", isActive);
      dot.setAttribute("aria-current", isActive ? "true" : "false");
    });
  }

  function updateRingProgress(activeSegment, progress) {
    if (!dots.length) return;

    dots.forEach((dot, index) => {
      const circle = dot.querySelector(".progress");
      if (!circle) return;

      if (index === activeSegment) {
        // Active segment shows progress
        const offset = EMPTY_OFFSET + (FULL_OFFSET - EMPTY_OFFSET) * progress;
        circle.style.strokeDashoffset = String(offset);
      } else {
        // Inactive segments stay empty
        circle.style.strokeDashoffset = String(EMPTY_OFFSET);
      }
    });
  }

  function resetUI() {
    currentTime = 0;
    hasEnded = false;
    updateUISegment(0);
    updateRingProgress(0, 0);
  }

  // =========================================================
  // VIDEO CONTROL FUNCTIONS
  // =========================================================

  function seekToTime(seconds) {
    if (!player) return Promise.reject("No player");

    return new Promise((resolve, reject) => {
      player
        .setCurrentTime(seconds)
        .then(() => {
          currentTime = seconds;
          hasEnded = false;
          updateDotsFromTime(seconds);
          resolve();
        })
        .catch((error) => {
          console.warn("Seek error:", error);
          reject(error);
        });
    });
  }

  function handleVideoEnd() {
    if (hasEnded) return;

    hasEnded = true;
    isPlaying = false;

    // Force reset to beginning
    resetUI();

    // Seek back to start and play again
    seekToTime(0)
      .then(() => {
        if (introDone && playerReady) {
          // Small delay for Firefox
          setTimeout(() => {
            player.play().catch(() => {});
          }, 50);
        }
      })
      .catch(() => {});
  }

  // =========================================================
  // RAF LOOP FOR SMOOTH PROGRESS
  // =========================================================

  function startRaf() {
    if (rafId) return;
    rafId = requestAnimationFrame(rafLoop);
  }

  function stopRaf() {
    if (rafId) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
  }

  function rafLoop() {
    rafId = requestAnimationFrame(rafLoop);

    if (!isPlaying || isBuffering || hasEnded) return;

    // Increment time based on real elapsed time
    const now = performance.now();
    const elapsed = (now - lastUpdateTime) / 1000;
    lastUpdateTime = now;

    // Update current time
    currentTime += elapsed;

    // Check if we've reached the end
    if (currentTime >= TOTAL_DURATION) {
      handleVideoEnd();
      return;
    }

    // Update UI based on current time
    updateDotsFromTime(currentTime);
  }

  // =========================================================
  // DOT CLICK HANDLER
  // =========================================================

  function handleDotClick(event) {
    event.preventDefault();
    event.stopPropagation();

    const dot = event.currentTarget;
    if (!player) return;

    const index = dots.indexOf(dot);
    if (index < 0) return;

    const targetTime = index * SEGMENT_DURATION;

    // Stop RAF
    stopRaf();

    // Seek to target time
    seekToTime(targetTime)
      .then(() => {
        // Ensure video is playing
        if (introDone && playerReady) {
          return player.play();
        }
      })
      .then(() => {
        // Restart RAF
        isPlaying = true;
        hasEnded = false;
        lastUpdateTime = performance.now();
        startRaf();
      })
      .catch(() => {});
  }

  // =========================================================
  // BUILD DOTS
  // =========================================================

  function buildDots() {
    dots = Array.from(document.querySelectorAll(".splide__pagination__page"));

    dots.forEach((dot, index) => {
      // Clear existing content
      dot.innerHTML = "";

      // Create SVG
      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg.setAttribute("viewBox", "2 2 26 26");
      svg.setAttribute("width", "41");
      svg.setAttribute("height", "41");

      const bgCircle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      bgCircle.setAttribute("class", "bg");
      bgCircle.setAttribute("cx", "16");
      bgCircle.setAttribute("cy", "16");
      bgCircle.setAttribute("r", "10");

      const progressCircle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      progressCircle.setAttribute("class", "progress");
      progressCircle.setAttribute("cx", "16");
      progressCircle.setAttribute("cy", "16");
      progressCircle.setAttribute("r", "10");

      svg.appendChild(bgCircle);
      svg.appendChild(progressCircle);
      dot.appendChild(svg);

      // Style the progress circle
      const circle = progressCircle;
      circle.style.strokeDasharray = String(EMPTY_OFFSET);
      circle.style.strokeDashoffset = String(EMPTY_OFFSET);
      circle.style.transition = "none";
      circle.style.stroke = "var(--skyblue)";
      circle.style.strokeWidth = "2.5";
      circle.style.fill = "none";

      // Add click handler
      dot.removeEventListener("click", handleDotClick);
      dot.addEventListener("click", handleDotClick);
    });

    // Set initial state
    resetUI();
  }

  // =========================================================
  // VIMEO PLAYER SETUP
  // =========================================================

  function setupPlayer(iframe) {
    player = new Vimeo.Player(iframe);
    player.setVolume(0).catch(() => {});

    player.on("loaded", async () => {
      playerReady = true;

      try {
        await player.pause();
      } catch (e) {}

      buildDots();
      resetUI();

      tryStartVideo();
    });

    player.on("play", () => {
      isPlaying = true;
      hasEnded = false;
      lastUpdateTime = performance.now();
      startRaf();
    });

    player.on("pause", () => {
      isPlaying = false;
      stopRaf();
    });

    player.on("timeupdate", (data) => {
      // Get fresh time from player
      currentTime = data.seconds;

      // Check for end (Firefox sometimes doesn't fire ended event)
      if (currentTime >= TOTAL_DURATION - 0.1) {
        handleVideoEnd();
        return;
      }

      // For Safari: force sync when going backwards
      if (data.seconds < lastUpdateTime - 0.5) {
        updateDotsFromTime(data.seconds);
      }

      lastUpdateTime = performance.now();
    });

    player.on("ended", () => {
      handleVideoEnd();
    });

    player.on("bufferstart", () => {
      isBuffering = true;
      stopRaf();
    });

    player.on("bufferend", () => {
      isBuffering = false;
      if (isPlaying && !hasEnded) {
        lastUpdateTime = performance.now();
        startRaf();
      }
    });

    player.on("seeked", () => {
      // Force UI update after seek
      player.getCurrentTime().then((time) => {
        currentTime = time;
        hasEnded = false;
        updateDotsFromTime(time);
      });
    });
  }

  function loadVimeo() {
    const existingIframe = wrapper.querySelector("iframe");
    if (existingIframe) {
      setupPlayer(existingIframe);
      return;
    }

    const iframe = document.createElement("iframe");
    const videoUrl = new URL(wrapper.dataset.video);
    videoUrl.searchParams.set("muted", "1");
    videoUrl.searchParams.set("playsinline", "1");
    videoUrl.searchParams.set("autopause", "0");
    iframe.src = videoUrl.toString();
    iframe.allow = "autoplay; fullscreen";
    iframe.frameBorder = "0";
    iframe.allowFullscreen = true;

    const holder = document.createElement("div");
    holder.className = "iframe-holder";
    holder.appendChild(iframe);

    wrapper.appendChild(holder);
    wrapper.dataset.loaded = "true";

    setupPlayer(iframe);
  }

  // =========================================================
  // INITIALIZATION
  // =========================================================

  if (wrapper.dataset.type === "vimeo") {
    loadVimeo();
  }

  // Start video near the end of intro animation
  tl.call(
    () => {
      introDone = true;
      tryStartVideo();
    },
    null,
    "-=0.7",
  );

  // Handle visibility changes
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      stopRaf();
    } else {
      if (isPlaying && !hasEnded) {
        lastUpdateTime = performance.now();
        startRaf();
      }
    }
  });

  // Clean up
  window.addEventListener("beforeunload", () => {
    stopRaf();
  });

  // Force periodic sync for Safari (every 500ms)
  setInterval(() => {
    if (player && isPlaying && !hasEnded) {
      player
        .getCurrentTime()
        .then((time) => {
          // Check if we need to sync (for Safari backward navigation)
          if (Math.abs(time - currentTime) > 0.1) {
            currentTime = time;
            updateDotsFromTime(time);
          }
        })
        .catch(() => {});
    }
  }, 500);
});
