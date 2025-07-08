// <script src="https://rglhpcjp-5500.inc1.devtunnels.ms/technology-page-old-scroll-animation.js"></script>

// Start First animation Scroll + click based-------------------------------------------------------------------------------------------------------------------------------------------------------------
// Start page on load--------------------------------------------------------------------------------
window.addEventListener("load", () => {
  if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
  }
  window.scrollTo(0, 0);
});

$(window).on("resize", function () {
  if (window.innerWidth > 767 || window.innerHeight > 830) {
    location.reload();
  }
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

// Start create process slider dots--------------------------------------------------------------------------------
const processSliderDots = processImgSection.querySelector(".process-slider-dots");

processSliderDots.innerHTML = "";

processSliderMainImgs.forEach((_, index) => {
  const dot = document.createElement("div");
  dot.classList.add("slider-dot");
  processSliderDots.appendChild(dot);
});
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
  },
  onLeave: () => {
    gsap.to(processImgSection, { opacity: 0 });
    processImgSection.classList.remove("active");
  },
  onEnterBack: () => {
    gsap.to(processImgSection, { opacity: 1 });
    processImgSection.classList.add("active");
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
    width:
      // window.innerWidth <= 375 && window.innerHeight <= 750
      //   ? "265%"
      //   : window.innerWidth <= 479 && window.innerHeight <= 750
      //   ? "265%"
      //   : window.innerWidth <= 479 && window.innerHeight <= 825
      //   ? "260%"
      //       :
      window.innerWidth <= 479 ? "265%" : window.innerWidth <= 767 ? "150%" : "120%",
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

// Start images on gray layer opacity 0 to 1-----------------------------------------
tl.to(processImgLayer, {
  delay: 1,
  opacity: 1,
  duration: 2,
  onUpdate: function () {
    if (this.progress() > 0) {
      gsap.to(processTabBarAnimation, { opacity: 1 });
      processTabImgContents[0].classList.add("active");
      processSection.querySelector(".process-tab-content").classList.add("active");
      processTabs[0].classList.add("active");
    } else {
      gsap.to(processTabBarAnimation, { opacity: 0 });
      processTabImgContents[0].classList.remove("active");
      processSection.querySelector(".process-tab-content").classList.remove("active");
      processTabs[0].classList.remove("active");
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
    processTabBarAnimation2.style.width = "100%";
  } else {
    processSection.querySelector(".process-slider-content").classList.remove("active");
    processTabBarAnimation2.style.width = "0%";
  }

  processTabImgContents.forEach((img, i) => {
    img.classList.toggle("active", i === index);
  });

  const activeImg = processTabImgContents[index].querySelector("img");
  processImgLayerWhite.style.width = `${activeImg.offsetWidth}px`;

  let translateX = 0;
  for (let i = 0; i <= index; i++) {
    translateX += processTabImgContents[i].offsetWidth;
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

tl.to(tabSync, {
  progress: 1,
  duration: 20,
  onUpdate: () => {
    const index = Math.round(tabSync.progress * (processTabs.length - 1));
    if (index !== lastTriggeredIndex) {
      tabChangeAnimation(processTabs[index], index);
      lastTriggeredIndex = index;
    }
  },
});

tl.addLabel("imgEnd");
// End images tab change on scroll-----------------------------------------

// Start process img slider section opacity 0 to 1-----------------------------------------
tl.to(processImgSection, {
  opacity: 1,
  duration: 1,
  onUpdate: function () {
    if (this.progress() > 0.1) {
      processImgSection.classList.add("active");
    } else {
      processImgSection.classList.remove("active");
    }
  },
});
// End process img slider section opacity 0 to 1-----------------------------------------

// Start img slider section: main title move bottom to top-----------------------------------------
tl.to(processSection.querySelector(".process-slider-main-title"), {
  delay: 2,
  y: "-100%",
  duration: 1.5,
  onUpdate: function () {
    if (this.progress() > 0) {
      processSliderMainImgs[0].classList.add("show-shadow");
      processImgSection.querySelectorAll(".slider-dot")[0].classList.add("active");
    } else {
      gsap.to(processSliderTitles[0], {
        top: "100%",
        duration: 1.5,
      });
      processSliderMainImgs[0].classList.remove("show-shadow");
      processImgSection.querySelectorAll(".slider-dot")[0].classList.remove("active");
    }
  },
});
// End img slider section: main title move bottom to top-----------------------------------------

// Start img slider section: 1st slide title move bottom to top-----------------------------------------
tl.to(
  processSliderTitles[0],
  {
    top: "0%",
    duration: 1.5,
  },
  "<"
);
// End img slider section: 1st slide title move bottom to top-----------------------------------------

// Start img slider section: 1st slide sub title opacity 0 to 1-----------------------------------------
tl.to(
  processSection.querySelector(".process-slider-sub-title"),
  {
    opacity: 1,
    duration: 1.5,
  },
  "<"
);
// End img slider section: 1st slide sub title opacity 0 to 1-----------------------------------------

// Start img slider section: 1st slide description opacity 0 to 1-----------------------------------------
tl.to(
  processSection.querySelector(".process-slider-description-wrapper"),
  {
    opacity: 1,
    duration: 1.5,
  },
  "<"
);
// End img slider section: 1st slide description opacity 0 to 1-----------------------------------------

// Start img slider section: 1st slide grid content opacity 0 to 1-----------------------------------------
tl.to(
  processSliderGridWrapper,
  {
    opacity: 1,
    duration: 1.5,
  },
  "<"
);
// End img slider section: 1st slide grid content opacity 0 to 1-----------------------------------------

// Start img slider section: slide change on scroll-----------------------------------------
tl.addLabel("dotStart");
const sliderStepSync = { step: 0 };
let currentSliderIndex = 0;

tl.to(sliderStepSync, {
  step: 2,
  duration: 20,
  onUpdate: () => {
    const stepIndex = Math.round(sliderStepSync.step);

    if (stepIndex !== currentSliderIndex) {
      const direction = stepIndex > currentSliderIndex ? "forward" : "backward";

      gsap.to(processSliderTitles[currentSliderIndex], {
        top: direction === "forward" ? "-100%" : "100%",
        duration: 1,
      });

      gsap.to(processSliderDescriptions[currentSliderIndex], {
        opacity: 0,
        duration: 1,
      });

      gsap.to(processSliderGridContents[currentSliderIndex], {
        zIndex: 0,
        opacity: 0,
        duration: 1,
      });

      gsap.to(processImgSection, {
        "--processSliderImgWrapperWidth": processSliderImgWrapper.offsetWidth + "px",
        duration: 0,
      });

      gsap.to(processSliderMainImgWrapper, {
        width: "var(--processSliderImgWrapperWidth-" + stepIndex + ")",
        duration: 0,
      });

      processSliderMainImgs.forEach((img) => img.classList.remove("active"));

      gsap.set(processSliderTitles[stepIndex], {
        top: direction === "forward" ? "100%" : "-100%",
      });

      gsap.to(processSliderTitles[stepIndex], {
        top: "0%",
        duration: 1,
      });

      gsap.to(processSliderDescriptions[stepIndex], {
        opacity: 1,
        duration: 1,
      });

      gsap.to(processSliderGridContents[stepIndex], {
        zIndex: 1,
        opacity: 1,
        duration: 1,
      });

      processSliderMainImgs[stepIndex].classList.add("active");

      currentSliderIndex = stepIndex;

      processSliderDots.querySelectorAll(".slider-dot").forEach((dot, i) => {
        dot.classList.toggle("active", i === stepIndex);
      });
    }
  },
});
// End img slider section: slide change on scroll-----------------------------------------
// End animation--------------------------------------------------------------------------------

// Start img click animation--------------------------------------------------------------------------------
const scrollStart = tl.scrollTrigger.labelToScroll("imgStart");
const scrollEnd = tl.scrollTrigger.labelToScroll("imgEnd");
const totalTabs = processTabImgContents.length;

processTabImgContents.forEach((item, index) => {
  item.addEventListener("click", () => {
    const progress = index / (totalTabs - 1);
    const scrollToPos = scrollStart + (scrollEnd - scrollStart) * progress;

    gsap.to(window, {
      scrollTo: scrollToPos,
      duration: 1,
      ease: "power2.out",
      onComplete: () => {
        tabChangeAnimation(processTabs[index], index);
        lastTriggeredIndex = index;
      },
    });

    if (!item.classList.contains("auto-clicked")) {
      item.classList.add("auto-clicked");

      setTimeout(() => {
        item.click();

        setTimeout(() => {
          item.classList.remove("auto-clicked");
        }, 100);
      }, 1000);
    }
  });
});
// End img click animation--------------------------------------------------------------------------------

// Start slider dots click animation--------------------------------------------------------------------------------
const dotScrollStart = tl.scrollTrigger.labelToScroll("dotStart");
const dotScrollEnd = tl.scrollTrigger.end;
const dots = processSliderDots.querySelectorAll(".slider-dot");

dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    if (index === currentSliderIndex) return;

    const progress = index / (processSliderMainImgs.length - 1);
    const scrollToPos = dotScrollStart + (dotScrollEnd - dotScrollStart) * progress;

    gsap.to(window, {
      scrollTo: scrollToPos,
      duration: 1,
      ease: "power2.out",
      onComplete: () => {
        currentSliderIndex = index;

        gsap.to(sliderStepSync, {
          step: index,
          duration: 0.5,
          ease: "none",
        });
      },
    });
  });
});
// End slider dots click animation--------------------------------------------------------------------------------

// Start slider back to tab click animation--------------------------------------------------------------------------------
const sliderBtn = document.querySelector(".process-slider-btn");

sliderBtn.addEventListener("click", () => {
  const totalTabs = processTabImgContents.length;
  const lastIndex = totalTabs - 1;

  const progress = lastIndex / (totalTabs - 1);
  const scrollToPos = scrollStart + (scrollEnd - scrollStart) * progress;

  gsap.to(window, {
    scrollTo: scrollToPos,
    duration: 1.2,
    ease: "power2.out",
    onComplete: () => {
      tabChangeAnimation(processTabs[lastIndex], lastIndex);
      lastTriggeredIndex = lastIndex;
    },
  });
});
// End slider back to tab click animation--------------------------------------------------------------------------------

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

setContentOutOfContainer();
window.addEventListener("resize", setContentOutOfContainer);
// End set gray layer width & position--------------------------------------------------------------------------------
// End First animation Scroll + click based-------------------------------------------------------------------------------------------------------------------------------------------------------------
