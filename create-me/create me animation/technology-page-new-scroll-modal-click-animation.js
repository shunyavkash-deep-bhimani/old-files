// <script src="https://rglhpcjp-5500.inc1.devtunnels.ms/technology-page-new-scroll-modal-click-animation.js"></script>

// Start First animation Scroll + modal click based-------------------------------------------------------------------------------------------------------------------------------------------------------------
// Start page on load--------------------------------------------------------------------------------
window.addEventListener("load", () => {
  if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
  }
  window.scrollTo(0, 0);
});

let prevWidth = window.innerWidth;
let resizeTimeout;

$(window).on("resize", function () {
  clearTimeout(resizeTimeout);

  resizeTimeout = setTimeout(function () {
    const currentWidth = window.innerWidth;

    if (currentWidth > 767 && window.innerHeight > 830) {
      location.reload();
    }
    if (currentWidth !== prevWidth) {
      location.reload();
    }

    prevWidth = currentWidth;
  }, 200); // Adjust debounce delay as needed
});
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
const processTabs = processSection.querySelectorAll(".process-tab");
let processTabBarAnimationWidth;
if (window.innerWidth > 991) {
  processTabBarAnimationWidth = 0;
  processTabBarAnimationWidth += processTabs[0].offsetWidth + processTabContentListGap / 2;
  processTabBarAnimation.style.width = processTabBarAnimationWidth + "px";
}
// End process-tab-bar-animation width--------------------------------------------------------------------------------

let processSectionDescriptionWrapper = processSection.querySelector(".process-section-description-wrapper");

const visibleLetters = processSection.querySelectorAll(".hero-title-word > .hero-title-letter");
const hiddenLetters = processSection.querySelectorAll(".hero-title-hidden-letters .hero-title-letter");

const processImgSection = processSection.querySelector(".process-img-section");
const processTabSliderContent = processImgSection.querySelector(".process-tab-slider-content");
const processSliderImgWrapper = processImgSection.querySelector(".process-slider-img-wrapper");

const processSliderMainImgWrapper = processImgSection.querySelector(".process-slider-main-img-wrapper");
processSliderMainImgWrapper.style.setProperty("width", "var(--processSliderImgWrapperWidth-0)");

let processSliderMainImgs = processImgSection.querySelectorAll(".process-slider-main-img");

let processSliderTitles = processImgSection.querySelectorAll(".process-slider-title");

let processSliderDescriptions = processImgSection.querySelectorAll(".process-slider-description");

let processSliderGridWrapper;
if (window.innerWidth > 1024) {
  // Start Desktop---------
  processSliderGridWrapper = processImgSection.querySelector(".process-slider-grid-wrapper.max-lg-d-none");
  // End Desktop---------
} else {
  // Start Mobile---------
  processSliderGridWrapper = processImgSection.querySelector(".process-slider-grid-wrapper.lg-d-none");
  // End Mobile---------
}

let processSliderGridContents = processSliderGridWrapper.querySelectorAll(".process-slider-grid-content");

const processTabBtn = document.querySelector(".process-tab-btn");

const processSliderBtn = document.querySelector(".process-slider-btn");

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
        gsap.to(letter, { opacity: 0 });
      } else {
        gsap.to(letter, { opacity: 1 });
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
          const hiddenWrapper = processSectionTitleWrapper.querySelector(".hero-title-hidden-letters-wrapper");
          // const tmText = processSectionTitleWrapper.querySelector(".hero-title-hidden-letters-wrapper .tm-sup-text");

          if (this.progress() === 1) {
            wordWrapper.style.opacity = 0;
            hiddenWrapper.style.opacity = 1;
            hiddenWrapper.style.visibility = "visible";

            // gsap.to(tmText, {
            //   opacity: 1,
            //   duration: 0.5,
            // });
          } else {
            wordWrapper.style.opacity = 1;
            hiddenWrapper.style.opacity = 0;
            hiddenWrapper.style.visibility = "hidden";

            // gsap.to(tmText, {
            //   opacity: 0,
            //   duration: 0.5,
            // });
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

  // Start images bottom content opacity 0 to 1-----------------------------------------
  tl.to(
    processSection.querySelector(".process-tab-content-wrapper"),
    {
      opacity: 1,
      duration: 1.5,
    },
    "<"
  );
  // End images bottom content opacity 0 to 1-----------------------------------------

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

  // Start images bottom content opacity 0 to 1-----------------------------------------
  tl.to(
    processSection.querySelector(".process-tab-content-wrapper"),
    {
      opacity: 1,
      duration: 1.5,
    },
    "<"
  );
  // End images bottom content opacity 0 to 1-----------------------------------------

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

// Start images on gray layer opacity 0 to 1-----------------------------------------
tl.to(processImgLayer, {
  delay: 1,
  opacity: 1,
  duration: 2,
  onUpdate: function () {
    if (this.progress() > 0) {
      gsap.to(processTabBarAnimation, { opacity: 1 });
      processTabImgContent[0].classList.add("active");
      processSection.querySelector(".process-tab-content").classList.add("active");
      processTabs[0].classList.add("active");
    } else {
      gsap.to(processTabBarAnimation, { opacity: 0 });
      processTabImgContent[0].classList.remove("active");
      processSection.querySelector(".process-tab-content").classList.remove("active");
      processTabs[0].classList.remove("active");
    }

    if (this.progress() > 0.98) {
      processSection.querySelector(".process-tab-content-wrapper").style.pointerEvents = "auto";
    } else {
      processSection.querySelector(".process-tab-content-wrapper").style.pointerEvents = "none";
    }
  },
});
// End images on gray layer opacity 0 to 1-----------------------------------------

// Start images tab change on scroll-----------------------------------------
tl.addLabel("imgStart");
let currentActiveIndex = 0;

function tabChangeAnimation(item, index) {
  if (index === currentActiveIndex) return;

  processTabs.forEach((item) => item.classList.remove("active"));
  item.classList.add("active");

  let widthChange = 0;

  if (index > currentActiveIndex) {
    for (let i = currentActiveIndex + 1; i <= index; i++) {
      widthChange += processTabs[i].offsetWidth + processTabContentListGap / 2;
    }
  } else {
    for (let i = currentActiveIndex; i > index; i--) {
      widthChange -= processTabs[i].offsetWidth + processTabContentListGap / 2;
    }
  }

  if (window.innerWidth > 991) {
    processTabBarAnimationWidth += widthChange;
    processTabBarAnimation.style.width = processTabBarAnimationWidth + (index * processTabContentListGap) / 2 + "px";
  }

  let processTabBarAnimation2 = processSection.querySelector(".process-tab-bar-animation-2");

  if (index === processTabs.length - 1) {
    processSection.querySelector(".process-slider-content").classList.add("active");
    processSection.querySelector(".process-tab-content").classList.remove("active");
    processTabBarAnimation2.style.width = "100%";
    setTimeout(() => {
      if (processTabImgContent[processTabs.length - 1].classList.contains("active")) {
        processTabImgContent[processTabs.length - 1].style.position = "relative";
        processTabImgContent[processTabs.length - 1].style.zIndex = 1;
        if (window.innerWidth < 992) {
          gsap.to(processSection.querySelector(".process-img-layer-gray-right"), {
            opacity: 0,
            duration: 0.2,
          });
        }
      }
    }, 500);
  } else {
    processSection.querySelector(".process-tab-content").classList.add("active");
    processSection.querySelector(".process-slider-content").classList.remove("active");
    processTabBarAnimation2.style.width = "0%";
    setTimeout(() => {
      if (!processTabImgContent[processTabs.length - 1].classList.contains("active")) {
        processTabImgContent[processTabs.length - 1].style.position = "static";
        processTabImgContent[processTabs.length - 1].style.zIndex = 0;
        if (window.innerWidth < 992) {
          gsap.to(processSection.querySelector(".process-img-layer-gray-right"), {
            opacity: 1,
          });
        }
      }
    }, 10);
  }

  processTabImgContent.forEach((img, i) => {
    img.classList.toggle("active", i === index);
  });

  const activeImg = processTabImgContent[index].querySelector("img");
  processImgLayerWhite.style.width = `${activeImg.offsetWidth}px`;

  let translateX = 0;
  for (let i = 0; i <= index; i++) {
    translateX += processTabImgContent[i].offsetWidth;
  }
  if (window.innerWidth > 991) {
    processImgLayer.style.transform = `translateX(${translateX}px)`;
  } else {
    processImgLayer.style.transform = `translateX(${activeImg.offsetWidth}px)`;
    processTabImgContentWrapper.style.transform = `translateX(-${translateX - activeImg.offsetWidth}px)`;
    processSection.querySelector(".process-tab-content-wrapper").style.setProperty("--index", index);
  }

  currentActiveIndex = index;
}

let tabSync = { progress: 0 };
let lastTriggeredIndex = -1;
let isManualScroll = false;

tl.to(tabSync, {
  progress: 1,
  duration: 20,
  onUpdate: () => {
    if (isManualScroll) return;

    const index = Math.round(tabSync.progress * (processTabs.length - 1));
    if (index !== lastTriggeredIndex) {
      tabChangeAnimation(processTabs[index], index);
      lastTriggeredIndex = index;
    }
  },
});

tl.addLabel("imgEnd");
// End images tab change on scroll-----------------------------------------
// End animation--------------------------------------------------------------------------------

// Start img & content click animation--------------------------------------------------------------------------------
const scrollStart = tl.scrollTrigger.labelToScroll("imgStart");
const scrollEnd = tl.scrollTrigger.labelToScroll("imgEnd");
const totalTabs = processTabImgContent.length;

const indexScrollPositions = [];
for (let i = 0; i < totalTabs; i++) {
  const progress = i / (totalTabs - 1);
  indexScrollPositions.push(gsap.utils.interpolate(scrollStart, scrollEnd, progress));
}

function handleTabClick(index, isAutoClick = false) {
  isManualScroll = true;
  const scrollTarget = indexScrollPositions[index];

  gsap.to(window, {
    duration: 1,
    scrollTo: {
      y: scrollTarget,
      autoKill: false,
    },
    onComplete: () => {
      isManualScroll = false;
    },
  });

  // Toggle active class on all tab images
  processTabImgContent.forEach((img, i) => {
    img.classList.toggle("active", i === index);
  });

  tabChangeAnimation(processTabs[index], index);
  currentActiveIndex = index;

  if (!isAutoClick) {
    const imgContent = processTabImgContent[index];
    if (!imgContent.classList.contains("auto-clicked")) {
      imgContent.classList.add("auto-clicked");

      setTimeout(() => {
        handleTabClick(index, true);
        setTimeout(() => {
          imgContent.classList.remove("auto-clicked");
        }, 100);
      }, 1000);
    }
  }
}

processTabImgContent.forEach((imgContent, index) => {
  imgContent.addEventListener("click", () => handleTabClick(index));
});

processTabs.forEach((tab, index) => {
  tab.addEventListener("click", () => handleTabClick(index));
});
// End img & content click animation--------------------------------------------------------------------------------

// Start tab to slider btn click animation--------------------------------------------------------------------------------
processSection.querySelector(".process-tab-btn").addEventListener("click", (e) => {
  document.documentElement.classList.add("overflow-hidden");
  processImgSection.classList.add("active");
  e.target.classList.add("active");
  processImgSection.querySelector(".process-tab-slider-wrapper").style.pointerEvents = "none";

  setTimeout(() => {
    processSliderMainImgs[0].classList.add("active", "show-shadow");
    processImgSection.querySelector(".process-tab-slider-wrapper").style.pointerEvents = "auto";

    gsap.to(processImgSection.querySelector(".process-slider-main-title"), {
      opacity: 0,
      duration: 1,
    });

    gsap.to([processSliderTitles[0], processImgSection.querySelector(".process-slider-sub-title"), processSection.querySelector(".process-slider-description-wrapper"), processSliderGridWrapper], {
      opacity: 1,
      duration: 1,
    });

    startAutoPlaySlider();
  }, 1500);
});
// End tab to slider btn click animation--------------------------------------------------------------------------------

// Start autoplay slider animation--------------------------------------------------------------------------------
let autoPlayIntervalSlider;
const autoPlaySliderDelay = 8000;
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
      let nextIndex = (currentSliderActiveIndex + 1) % processSliderMainImgs.length;
      switchSlider(nextIndex);
    }, autoPlaySliderDelay);
  }
}
// End autoplay slider animation--------------------------------------------------------------------------------

// Start slider change animation--------------------------------------------------------------------------------
let currentSliderActiveIndex = 0;

function switchSlider(index) {
  if (index === currentSliderActiveIndex) return;

  resetAutoPlaySliderAfterClick();

  gsap.to([processSliderTitles[currentSliderActiveIndex], processSliderDescriptions[currentSliderActiveIndex], processSliderGridContents[currentSliderActiveIndex]], {
    opacity: 0,
    zIndex: 0,
    duration: 1,
  });

  gsap.to([processSliderTitles[index], processSliderDescriptions[index], processSliderGridContents[index]], {
    opacity: 1,
    zIndex: 1,
    duration: 1,
  });

  processSliderMainImgs.forEach((el) => el.classList.remove("active", "show-shadow"));
  setTimeout(() => processSliderMainImgs[index].classList.add("show-shadow"), 500);
  processSliderMainImgs[index].classList.add("active");

  processImgSection.style.setProperty("--processSliderImgWrapperWidth", processSliderImgWrapper.clientWidth + "px");
  processSliderMainImgWrapper.style.width = `var(--processSliderImgWrapperWidth-${index})`;
  currentSliderActiveIndex = index;
}
// End slider change animation--------------------------------------------------------------------------------

// Start slider arrows click animation--------------------------------------------------------------------------------
const prevBtn = processImgSection.querySelector(".slider-prev-arrow");
const nextBtn = processImgSection.querySelector(".slider-next-arrow");

prevBtn.addEventListener("click", () => {
  let prevIndex = (currentSliderActiveIndex - 1 + processSliderMainImgs.length) % processSliderMainImgs.length;
  switchSlider(prevIndex);
  resetAutoPlaySliderAfterClick();
});

nextBtn.addEventListener("click", () => {
  let nextIndex = (currentSliderActiveIndex + 1) % processSliderMainImgs.length;
  switchSlider(nextIndex);
  resetAutoPlaySliderAfterClick();
});
// End slider arrows click animation--------------------------------------------------------------------------------

// Start slider img swipe animation--------------------------------------------------------------------------------
let swipeStartX = 0;
let swipeStartY = 0;
let swipeEndX = 0;
let swipeEndY = 0;
let isMouseDown = false;

function handleSliderSwipe() {
  const deltaX = swipeEndX - swipeStartX;
  const deltaY = swipeEndY - swipeStartY;
  const isHorizontalSwipe = Math.abs(deltaX) > Math.abs(deltaY);
  const swipeThreshold = 50;
  const lastIndex = processSliderMainImgs.length - 1;

  if (isHorizontalSwipe) {
    if (deltaX < -swipeThreshold) {
      // Swipe Left → Next (loop to first)
      const nextIndex = currentSliderActiveIndex === lastIndex ? 0 : currentSliderActiveIndex + 1;
      switchSlider(nextIndex);
    } else if (deltaX > swipeThreshold) {
      // Swipe Right → Prev (loop to last)
      const prevIndex = currentSliderActiveIndex === 0 ? lastIndex : currentSliderActiveIndex - 1;
      switchSlider(prevIndex);
    }
  } else {
    if (deltaY < -swipeThreshold) {
      // Swipe Up → Next (loop to first)
      const nextIndex = currentSliderActiveIndex === lastIndex ? 0 : currentSliderActiveIndex + 1;
      switchSlider(nextIndex);
    } else if (deltaY > swipeThreshold) {
      // Swipe Down → Prev (loop to last)
      const prevIndex = currentSliderActiveIndex === 0 ? lastIndex : currentSliderActiveIndex - 1;
      switchSlider(prevIndex);
    }
  }

  resetAutoPlaySliderAfterClick();
}

function onMouseDown(e) {
  if (e.button !== 0) return;
  isMouseDown = true;
  swipeStartX = e.clientX;
  swipeStartY = e.clientY;
}

function onMouseMove(e) {
  if (!isMouseDown) return;
  swipeEndX = e.clientX;
  swipeEndY = e.clientY;
}

function onMouseUp(e) {
  if (!isMouseDown || e.button !== 0) return;
  isMouseDown = false;
  swipeEndX = e.clientX;
  swipeEndY = e.clientY;
  handleSliderSwipe();
}

function onTouchStart(e) {
  swipeStartX = e.touches[0].clientX;
  swipeStartY = e.touches[0].clientY;
}

function onTouchEnd(e) {
  swipeEndX = e.changedTouches[0].clientX;
  swipeEndY = e.changedTouches[0].clientY;
  handleSliderSwipe();
}

processTabSliderContent.addEventListener("touchstart", onTouchStart);
processTabSliderContent.addEventListener("touchend", onTouchEnd);
processTabSliderContent.addEventListener("mousedown", onMouseDown);
processTabSliderContent.addEventListener("mousemove", onMouseMove);
processTabSliderContent.addEventListener("mouseup", onMouseUp);
// End slider img swipe animation--------------------------------------------------------------------------------

// Start slider to tab btn click animation--------------------------------------------------------------------------------
processSection.querySelector(".process-slider-btn").addEventListener("click", (e) => {
  document.documentElement.classList.remove("overflow-hidden");
  processSection.querySelector(".process-tab-btn").classList.remove("active");
  processImgSection.classList.remove("active");
  processImgSection.querySelector(".process-tab-slider-wrapper").style.pointerEvents = "none";

  setTimeout(() => {
    if (currentSliderActiveIndex !== 0) {
      switchSlider(0);
    }

    clearInterval(autoPlayIntervalSlider);
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
    processImgSection.style.setProperty("--processSliderImgWrapperWidth", `${processTabSliderContent.clientWidth}px`);
  }
}

setContentOutOfContainer();
window.addEventListener("resize", setContentOutOfContainer);
// End set gray layer width & position--------------------------------------------------------------------------------
// End First animation Scroll + modal click based-------------------------------------------------------------------------------------------------------------------------------------------------------------
