// <script src="https://rglhpcjp-5500.inc1.devtunnels.ms/technology-page-new-click-animation.js"></script>

// Start Second animation half Scroll + tab & slider click without scroll based-------------------------------------------------------------------------------------------------------------------------------------------------------------
// Start page on load--------------------------------------------------------------------------------
window.addEventListener("load", () => {
  if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
  }
  window.scrollTo(0, 0);
});

// $(window).on("resize", function () {
//   if (window.innerWidth > 767 || window.innerHeight > 830) {
//     location.reload();
//   }
// });
// End page on load--------------------------------------------------------------------------------

let processSection = document.querySelector(".process-section");
let processSectionWrapper = processSection.querySelector(".process-section-wrapper");

// Start set process-section-sub-title height--------------------------------------------------------------------------------
const processSectionHeading = processSection.querySelector(".process-section-heading");
const currentProcessSectionHeadingHeight = processSectionHeading.offsetHeight;
const processSectionTitleHeight = processSection.querySelector(".process-section-sub-title").offsetHeight;
processSectionHeading.style.height = currentProcessSectionHeadingHeight + processSectionTitleHeight + "px";
// End set process-section-sub-title height--------------------------------------------------------------------------------

let processSectionTitleWrapper = processSection.querySelector(".process-section-title-wrapper");
let processTabImgWrapper = processSection.querySelector(".process-tab-img-wrapper");
let processTabImgContentWrapper = processTabImgWrapper.querySelector(".process-tab-img-content-wrapper");

// Start set process-img-layer-white width--------------------------------------------------------------------------------
const processImgLayer = processTabImgWrapper.querySelector(".process-img-layer");
const processTabImgContent = processTabImgWrapper.querySelectorAll(".process-tab-img-content");
const processImgLayerWhite = processTabImgWrapper.querySelector(".process-img-layer-white");
// End set process-img-layer-white width--------------------------------------------------------------------------------

// Start process-tab-content-list gap--------------------------------------------------------------------------------
const processTabContent = document.querySelector(".process-tab-content");
const processSliderContent = document.querySelector(".process-slider-content");

const processTabContentList = processSection.querySelector(".process-tab-content-list");
let allProcessTabWidth = 0;
processTabContentList.querySelectorAll(".process-tab").forEach((item) => {
  allProcessTabWidth += item.offsetWidth;
});
let processTabContentListGap = (processTabContentList.offsetWidth - allProcessTabWidth) / 3;
// End process-tab-content-list gap--------------------------------------------------------------------------------

// Start process-tab-bar-animation width--------------------------------------------------------------------------------
const processTabBarWrapper = processSection.querySelector(".process-tab-bar-wrapper");
const processTabBarAnimation = processSection.querySelector(".process-tab-bar-animation");
let processTabBarAnimation2 = processSection.querySelector(".process-tab-bar-animation-2");

const processTabs = processSection.querySelectorAll(".process-tab");

let processTabBarAnimationWidth;

if (window.innerWidth > 991) {
  processTabBarAnimationWidth = 0;
  processTabBarAnimationWidth += processTabs[0].offsetWidth + processTabContentListGap / 2;
  processTabBarAnimation.style.width = processTabBarAnimationWidth + "px";
}
// End process-tab-bar-animation width--------------------------------------------------------------------------------

let processSectionDescriptionWrapper = processSection.querySelector(".process-section-description-wrapper");

let processTabImgContents = processTabImgWrapper.querySelectorAll(".process-tab-img-content");

const visibleLetters = processSection.querySelectorAll(".hero-title-word > .hero-title-letter");
const hiddenLetters = processSection.querySelectorAll(".hero-title-hidden-letters .hero-title-letter");

const processImgSection = processSection.querySelector(".process-img-section");

const processSliderImgWrapper = processImgSection.querySelector(".process-slider-img-wrapper");

const processSliderMainImgWrapper = processImgSection.querySelector(".process-slider-main-img-wrapper");
processSliderMainImgWrapper.style.setProperty("width", "var(--processSliderImgWrapperWidth-0)");

let processSliderMainImgs = processImgSection.querySelectorAll(".process-slider-main-img");

let processSliderTitles = processImgSection.querySelectorAll(".process-slider-title");

let processSliderDescriptions = processImgSection.querySelectorAll(".process-slider-description");

let processSliderGridWrapper;
if (window.innerWidth > 991) {
  // Start Desktop---------
  processSliderGridWrapper = processImgSection.querySelector(".process-slider-grid-wrapper.max-lg-d-none");
  // End Desktop---------
} else {
  // Start Mobile---------
  processSliderGridWrapper = processImgSection.querySelector(".process-slider-grid-wrapper.lg-d-none");
  // End Mobile---------
}

let processSliderGridContents = processSliderGridWrapper.querySelectorAll(".process-slider-grid-content");

// Start create process slider dots--------------------------------------------------------------------------------
const processSliderDots = processImgSection.querySelector(".process-slider-dots");

processSliderDots.innerHTML = "";

processSliderMainImgs.forEach((_, index) => {
  const dot = document.createElement("div");
  const dotInner = document.createElement("div");
  dot.classList.add("slider-dot");
  dotInner.classList.add("slider-dot-content");
  dot.appendChild(dotInner);
  processSliderDots.appendChild(dot);
});

const sliderDots = processSliderDots.querySelectorAll(".slider-dot");

// End create process slider dots--------------------------------------------------------------------------------

// Start animation--------------------------------------------------------------------------------
// Start create trigger for scroll-----------------------------------------
ScrollTrigger.create({
  trigger: processSection,
  start: "top top",
  end: "bottom bottom",
  pin: processSectionWrapper,
  pinSpacing: false,
  // markers: true,
  onEnter: () => {
    processSliderMainImgs.forEach((element) => {
      element.style.position = "absolute";
    });
    processTabImgContentWrapper.style.pointerEvents = "none";
    processTabContent.classList.remove("active");
    processTabs[0].classList.remove("active");
  },
});
// End create trigger for scroll-----------------------------------------

// Start create timeline-----------------------------------------
const tl = gsap.timeline({
  scrollTrigger: {
    trigger: processSection,
    start: "top top",
    end: "bottom 130%",
    scrub: 1,
    // markers: true,
  },
});
// End create timeline-----------------------------------------

// Start opacity 0 to 1 in mera text-----------------------------------------
tl.to(processSectionTitleWrapper, {
  opacity: 1,
  duration: 1,
});
// End opacity 0 to 1 in mera text-----------------------------------------

// Start hide mera text extra char-----------------------------------------
tl.to(".hero-title-letters", {
  "--position": "0%",
  delay: 1,
  duration: 2,
  onUpdate: function () {
    document.querySelectorAll(".hero-title-letters").forEach((letter) => {
      if (this.progress() === 1) {
        gsap.to(letter, {
          opacity: 0,
        });
      } else {
        gsap.to(letter, {
          opacity: 1,
        });
      }
    });
  },
});
// End hide mera text extra char-----------------------------------------

// Start change coloe in mera text-----------------------------------------
tl.to(processSectionTitleWrapper.querySelector(".process-section-title:first-child"), {
  delay: 1,
  color: "var(--skyblue)",
  duration: 0.5,
});
// End change coloe in mera text-----------------------------------------

tl.to(".hero-title-letter", {
  delay: 1,
});

// Start change position mera text-----------------------------------------
const charMap = {};

hiddenLetters.forEach((hiddenLetter) => {
  const char = hiddenLetter.textContent.trim();
  if (char && !charMap[char]) {
    charMap[char] = hiddenLetter;
  }
});

const flipState = Flip.getState(visibleLetters);

visibleLetters.forEach((char) => {
  const match = charMap[char.textContent.trim()];
  if (match) {
    const { top, left, width, height } = match.getBoundingClientRect();
    const bounds = char.getBoundingClientRect();

    const dx = left - bounds.left;
    const dy = top - bounds.top;

    tl.to(
      char,
      {
        x: dx,
        y: dy,
        scaleX: width / bounds.width,
        scaleY: height / bounds.height,
        duration: 2,
        onUpdate: function () {
          const wordWrapper = processSectionTitleWrapper.querySelector(".hero-title-word-wrapper");
          const hiddenWrapper = processSectionTitleWrapper.querySelector(".hero-title-hidden-letters");

          if (this.progress() === 1) {
            wordWrapper.style.opacity = 0;
            hiddenWrapper.style.opacity = 1;
            hiddenWrapper.style.visibility = "visible";
          } else {
            wordWrapper.style.opacity = 1;
            hiddenWrapper.style.opacity = 0;
            hiddenWrapper.style.visibility = "hidden";
          }
        },
      },
      "<"
    );
  }
});
// End change position mera text-----------------------------------------

// Start set mera text height-----------------------------------------
tl.to(processSectionTitleWrapper, {
  delay: 1,
  height: processSectionTitleHeight + "px",
  duration: 2,
  onUpdate: function () {
    if (this.progress() === 1) {
      processSectionTitleWrapper.style.height = "auto";
      processSectionTitleWrapper?.classList.remove("active");
    } else {
      processSectionTitleWrapper?.classList.add("active");
    }
  },
});
// End set mera text height-----------------------------------------

if (window.innerWidth > 991) {
  // Start images move bottom to top-----------------------------------------
  tl.to(
    processTabImgWrapper,
    {
      y: "0%",
      scale: 1,
      opacity: 1,
      duration: 2,
      onComplete: () => {
        let processTabImgContentWidth = processTabImgContent[0].offsetWidth + "px";
        processImgLayerWhite.style.width = processTabImgContentWidth;
        processImgLayer.style.transform = `translateX(${processTabImgContentWidth})`;
      },

      onUpdate: function () {
        if (this.progress() === 1) {
          processSectionHeading.style.height = "auto";
        } else {
          processSectionHeading.style.height = currentProcessSectionHeadingHeight + processSectionTitleHeight + "px";
        }
      },
    },
    "<0.2"
  );
  // End images move bottom to top-----------------------------------------

  // Start mera text bottom description opacity 0 to 1-----------------------------------------
  tl.to(processSectionDescriptionWrapper, {
    delay: 1,
    opacity: 1,
    duration: 1.5,
  });
  // End mera text bottom description opacity 0 to 1-----------------------------------------
} else {
  // Start images opacity 0 to 1-----------------------------------------
  tl.to(
    processTabImgWrapper,
    {
      opacity: 1,
      duration: 2,

      onUpdate: function () {
        if (this.progress() === 1) {
          processSectionHeading.style.height = "auto";
        } else {
          processSectionHeading.style.height = currentProcessSectionHeadingHeight + processSectionTitleHeight + "px";
        }
      },
    },
    "<"
  );
  // End images opacity 0 to 1-----------------------------------------

  // Start mera bottom description opacity 0 to 1-----------------------------------------
  tl.to(
    processSectionDescriptionWrapper,
    {
      opacity: 1,
      duration: 1.5,
    },
    "<"
  );
  // End mera bottom description opacity 0 to 1-----------------------------------------

  // Start images parent div set width-----------------------------------------
  tl.to(processTabImgWrapper, {
    width: window.innerWidth <= 479 ? "265%" : window.innerWidth <= 767 ? "150%" : "120%",
    duration: 1.5,
    onComplete: () => {
      let processTabImgContentWidth = processTabImgContent[0].offsetWidth + "px";
      processImgLayerWhite.style.width = processTabImgContentWidth;
      processImgLayer.style.transform = `translateX(${processTabImgContentWidth})`;
      // Start for responsive <= 991-----------
      processTabImgContentWrapper.style.transform = `translateX(${processTabImgContentWidth - processTabImgContentWidth})`;
      // End for responsive <= 991-----------
    },
  });
  // End images parent div set width-----------------------------------------
}

// Start mera text change to another text-----------------------------------------
tl.to(processSectionTitleWrapper.querySelectorAll(".process-section-title"), {
  delay: 1,
  y: "-100%",
  duration: 1.5,
});
// End mera text change to another text-----------------------------------------

// Start mera bottom 1st description opacity 1 to 0-----------------------------------------
tl.to(
  processSection.querySelector(".process-section-description:first-child"),
  {
    opacity: 0,
    duration: 1.5,
  },
  "<"
);
// End mera bottom 1st description opacity 1 to 0-----------------------------------------

if (window.innerWidth > 991) {
  // Start mera bottom 2nd description move bottom to top-----------------------------------------
  tl.to(
    processSection.querySelector(".process-section-description:last-child"),
    {
      y: "-100%",
      duration: 1.5,
    },
    "<"
  );
  // End mera bottom 2nd description move bottom to top-----------------------------------------
} else {
  // Start mera bottom 2nd description opacity 0 to 1-----------------------------------------
  tl.to(
    processSection.querySelector(".process-section-description:last-child"),
    {
      opacity: 1,
      duration: 1.5,
    },
    "<"
  );
  // End mera bottom 1st description opacity 0 to 1-----------------------------------------
}

// Start tab img & content swipe animation--------------------------------------------------------------------------------
let touchStartX = 0;
let touchEndX = 0;

function handleSwipeGesture() {
  const swipeThreshold = 50;

  if (touchEndX < touchStartX - swipeThreshold) {
    if (currentActiveIndex < processTabImgContent.length - 1) {
      setActiveTab(currentActiveIndex + 1);
      resetAutoPlayTabAfterClick();
    }
  }

  if (touchEndX > touchStartX + swipeThreshold) {
    if (currentActiveIndex > 0) {
      setActiveTab(currentActiveIndex - 1);
      resetAutoPlayTabAfterClick();
    }
  }
}

// Save references to event listeners so we can remove them
function handleTouchStart(e) {
  touchStartX = e.changedTouches[0].screenX;
}

function handleTouchEnd(e) {
  touchEndX = e.changedTouches[0].screenX;
  handleSwipeGesture();
}
// End tab img & content swipe animation--------------------------------------------------------------------------------

// Start images & bottom content opacity 0 to 1-----------------------------------------
tl.to(
  processSection.querySelector(".process-tab-content-wrapper"),
  {
    opacity: 1,
    duration: 1.5,
    onUpdate: function () {
      if (this.progress() === 1) {
        processTabImgContentWrapper.style.pointerEvents = "auto";
        gsap.to([processImgLayer, processTabBarAnimation], {
          opacity: 1,
          duration: 1,
        });
        processSection.querySelector(".process-tab-content").classList.add("active");
        processTabs[0].classList.add("active");

        if (window.innerWidth < 992) {
          processTabImgWrapper.addEventListener("touchstart", handleTouchStart);
          processTabImgWrapper.addEventListener("touchend", handleTouchEnd);
          resetAutoPlayTabAfterClick();
        }

        startAutoPlayTab();
      } else {
        if (processSection.querySelector(".process-tab-content").classList.contains("active") || processSection.querySelector(".process-slider-content").classList.contains("active")) {
          processTabImgContent[0].click();
        }
        processTabImgContentWrapper.style.pointerEvents = "none";
        gsap.to([processImgLayer, processTabBarAnimation], {
          opacity: 0,
          duration: 1,
        });
        processSection.querySelector(".process-tab-content").classList.remove("active");
        processTabs[0].classList.remove("active");

        if (window.innerWidth < 992) {
          processTabImgWrapper.removeEventListener("touchstart", handleTouchStart);
          processTabImgWrapper.removeEventListener("touchend", handleTouchEnd);
        }

        clearInterval(autoPlayIntervalTab);
      }
    },
  },
  "<"
);
// End images & bottom content opacity 0 to 1-----------------------------------------

// Start switch images tab auto animation--------------------------------------------------------------------------------
let autoPlayIntervalTab;
let autoPlayTabDelay = 5000;
let isAutoPlayTabPaused = false;

function resetAutoPlayTabAfterClick() {
  pauseAutoPlayTab();
  resumeAutoPlayTab();
}

function startAutoPlayTab() {
  clearInterval(autoPlayIntervalTab);
  if (!isAutoPlayTabPaused) {
    autoPlayIntervalTab = setInterval(() => {
      let nextIndex = (currentActiveIndex + 1) % processTabImgContent.length;
      setActiveTab(nextIndex);
    }, autoPlayTabDelay);
  }
}

function pauseAutoPlayTab() {
  isAutoPlayTabPaused = true;
  startAutoPlayTab();
}

function resumeAutoPlayTab() {
  isAutoPlayTabPaused = false;
  startAutoPlayTab();
}
// End switch images tab auto animation--------------------------------------------------------------------------------

// Start images tab first active-----------------------------------------
let currentActiveIndex = 0;

function getTranslateX(index) {
  let translateX = 0;
  for (let i = 0; i <= index; i++) {
    translateX += processTabImgContent[i].offsetWidth;
  }
  return translateX;
}

function setActiveTab(index) {
  processTabs.forEach((tab, i) => {
    tab.classList.toggle("active", i === index);
  });

  processTabImgContent.forEach((el) => el.classList.remove("active"));
  const activeTab = processTabImgContent[index];
  activeTab.classList.add("active");

  const tabWidth = activeTab.offsetWidth;
  const translateX = getTranslateX(index);
  processImgLayerWhite.style.width = `${tabWidth}px`;

  if (window.innerWidth > 991) {
    processImgLayer.style.transform = `translateX(${translateX}px)`;
  } else {
    processImgLayer.style.transform = `translateX(${tabWidth}px)`;
    processTabImgContentWrapper.style.transform = `translateX(-${translateX - tabWidth}px)`;
    processSection.querySelector(".process-tab-content-wrapper").style.setProperty("--index", index);
  }

  let barWidth = 0;
  for (let i = 0; i <= index; i++) {
    barWidth += processTabs[i].offsetWidth;
    if (i > 0) {
      barWidth += processTabContentListGap;
    }
  }

  if (index !== processTabs.length - 1) {
    barWidth += processTabContentListGap / 2;
    processTabBarAnimation.style.width = `${barWidth}px`;
    processTabBarAnimation2.style.width = "0%";
    processTabContent.classList.add("active");
    processSliderContent.classList.remove("active");
  } else {
    processTabBarAnimation.style.width = "100%";
    processTabBarAnimation2.style.width = "100%";
    processTabContent.classList.remove("active");
    processSliderContent.classList.add("active");
  }

  currentActiveIndex = index;
}

setActiveTab(0);
// End images tab first active-----------------------------------------
// End animation--------------------------------------------------------------------------------

// Start tab images & contents click animation--------------------------------------------------------------------------------
processTabImgContent.forEach((item, index) => {
  item.addEventListener("click", () => {
    setActiveTab(index);
    resetAutoPlayTabAfterClick();
  });
});

processTabs.forEach((item, index) => {
  item.addEventListener("click", () => {
    setActiveTab(index);
    resetAutoPlayTabAfterClick();
  });
});
// End tab images & contents click animation--------------------------------------------------------------------------------

// Start tab to slider btn click animation--------------------------------------------------------------------------------
processSection.querySelector(".process-tab-btn").addEventListener("click", (e) => {
  e.target.classList.add("active");
  document.body.classList.add("overflow-hidden");
  processImgSection.classList.add("active");

  pauseAutoPlayTab();

  setTimeout(() => {
    processSliderMainImgs[0].classList.add("active", "show-shadow");
    sliderDots[0].classList.add("active");

    gsap.to(processImgSection.querySelector(".process-slider-main-title"), {
      y: "-100%",
      duration: 1,
    });

    gsap.to(processSliderTitles[0], {
      top: "0%",
      duration: 1,
    });

    gsap.to([processImgSection.querySelector(".process-slider-sub-title"), processSection.querySelector(".process-slider-sub-title"), processSection.querySelector(".process-slider-description-wrapper"), processSliderGridWrapper], {
      opacity: 1,
      duration: 1,
    });

    startAutoPlaySlider();
  }, 1000);
});
// End tab to slider btn click animation--------------------------------------------------------------------------------

// Start autoplay slider animation--------------------------------------------------------------------------------
let autoPlayIntervalSlider;
const autoPlaySliderDelay = 5000;
let isAutoPlaySliderPaused = false;

function resetAutoPlaySliderAfterClick() {
  isAutoPlaySliderPaused = true;
  clearInterval(autoPlayIntervalSlider);

  isAutoPlaySliderPaused = false;
  startAutoPlaySlider();
}

function startAutoPlaySlider() {
  clearInterval(autoPlayIntervalSlider);

  if (!isAutoPlaySliderPaused) {
    autoPlayIntervalSlider = setInterval(() => {
      let nextIndex = (currentSliderActiveIndex + 1) % sliderDots.length;
      sliderDots[nextIndex].click();
    }, autoPlaySliderDelay);
  }
}
// End autoplay slider animation--------------------------------------------------------------------------------

// Start slider dots click animation--------------------------------------------------------------------------------
let currentSliderActiveIndex = 0;

sliderDots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    if (index === currentSliderActiveIndex) return;

    resetAutoPlaySliderAfterClick();

    const isForward = index > currentSliderActiveIndex;
    gsap.to(processSliderTitles[currentSliderActiveIndex], {
      top: isForward ? "-100%" : "100%",
      duration: 1,
      ease: "power2.inOut",
    });
    gsap.set(processSliderTitles[index], {
      top: isForward ? "100%" : "-100%",
    });
    gsap.to(processSliderTitles[index], {
      top: "0%",
      duration: 1,
      ease: "power2.inOut",
    });

    sliderDots.forEach((el) => el.classList.remove("active"));
    dot.classList.add("active");

    processSliderMainImgs.forEach((el) => {
      el.classList.remove("active");
      el.classList.remove("show-shadow");
    });

    processSliderMainImgs[index].classList.add("active");
    setTimeout(() => {
      processSliderMainImgs[index].classList.add("show-shadow");
    }, 500);

    processSliderDescriptions.forEach((el) =>
      gsap.to(el, {
        zIndex: 0,
        opacity: 0,
        duration: 1,
      })
    );
    processSliderGridContents.forEach((el) =>
      gsap.to(el, {
        zIndex: 0,
        opacity: 0,
        duration: 1,
      })
    );
    gsap.to([processSliderDescriptions[index], processSliderGridContents[index]], {
      zIndex: 1,
      opacity: 1,
      duration: 1,
    });

    processImgSection.style.setProperty("--processSliderImgWrapperWidth", processSliderImgWrapper.clientWidth + "px");
    processSliderMainImgWrapper.style.width = `var(--processSliderImgWrapperWidth-${index})`;

    currentSliderActiveIndex = index;
  });
});
// End slider dots click animation--------------------------------------------------------------------------------

// Start slider to tab btn click animation--------------------------------------------------------------------------------
document.querySelector(".process-slider-btn").addEventListener("click", () => {
  processImgSection.classList.remove("active");
  processSection.querySelector(".process-tab-btn").classList.remove("active");
  document.body.classList.remove("overflow-hidden");

  resumeAutoPlayTab();

  setTimeout(() => {
    if (currentSliderActiveIndex !== 0) {
      sliderDots[0].click();
    }
    stopAutoPlaySlider();
  }, 1000);
});
// End slider to tab btn click animation--------------------------------------------------------------------------------

// Start set gray layer width & position--------------------------------------------------------------------------------
function setContentOutOfContainer() {
  processImgSection.style.setProperty("--containerWidth", `${processImgSection.querySelector(".container").clientWidth}px`);

  setTimeout(() => {
    processSliderMainImgWrapper.style.setProperty("width", "var(--processSliderImgWrapperWidth-0)");

    processSliderMainImgs.forEach((processSliderMainImg, index) => {
      processImgSection.style.setProperty("--processSliderImgWrapperWidth-" + index, `${processSliderMainImg.clientWidth}px`);
    });
  }, 1000);

  if (window.innerWidth > 991) {
    processImgSection.style.setProperty("--processSliderImgWrapperWidth", `${processSliderImgWrapper.clientWidth}px`);
  } else {
    processImgSection.style.setProperty("--processSliderImgWrapperWidth", `${processSection.querySelector(".process-tab-slider-content").clientWidth}px`);
  }
}

window.addEventListener("load", () => {
  setContentOutOfContainer();
});
window.addEventListener("resize", setContentOutOfContainer);
// End set gray layer width & position--------------------------------------------------------------------------------
// End Second animation half Scroll + tab & slider click without scroll based-------------------------------------------------------------------------------------------------------------------------------------------------------------
