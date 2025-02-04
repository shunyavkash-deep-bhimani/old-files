import "https://code.jquery.com/jquery-3.5.1.min.js";

// <!-- Start Nice Select------------------------------------------------------------------------------------------------>
import "https://cdnjs.cloudflare.com/ajax/libs/jquery-nice-select/1.1.0/js/jquery.nice-select.js";

$(document).ready(function () {
  $("select").niceSelect();
});

// <!-- End Nice Select------------------------------------------------------------------------------------------------>

// Start header height---------------------------------------------------------------------------------------------
const header = document.querySelector("header");

function updateHeaderHeight() {
  let headerHeight = header.offsetHeight;
  document.documentElement.style.setProperty(
    "--header-height",
    headerHeight + "px"
  );
}
updateHeaderHeight();
window.addEventListener("resize", updateHeaderHeight);
// End header height--------------------------------------------------------------------------------------------------

// <!-- AUTO-ROTATING TABS -->

// Function to rotate tabs
function initializeTabRotator() {
  // Find all tab containers with the ms-code-rotate-tabs attribute
  const tabContainers = document.querySelectorAll("[ms-code-rotate-tabs]");

  tabContainers.forEach((container) => {
    const interval = parseInt(
      container.getAttribute("ms-code-rotate-tabs"),
      10
    );
    const tabLinks = container.querySelectorAll(".w-tab-link");
    const tabContent = container
      .closest(".w-tabs")
      .querySelector(".w-tab-content");
    const tabPanes = tabContent.querySelectorAll(".w-tab-pane");
    let currentIndex = Array.from(tabLinks).findIndex((link) =>
      link.classList.contains("w--current")
    );
    let rotationTimer;

    // ANIMATION CONFIGURATION
    // Modify these values to adjust the animation behavior
    const FADE_OUT_DURATION = 300; // Duration for fading out the current tab (in milliseconds)
    const FADE_IN_DURATION = 100; // Duration for fading in the new tab (in milliseconds)
    const EASING_FUNCTION = "ease"; // Choose from: 'linear', 'ease', 'ease-in', 'ease-out', 'ease-in-out'
    // or use a cubic-bezier function like 'cubic-bezier(0.1, 0.7, 1.0, 0.1)'
    // Additional easing options (uncomment to use):
    // const EASING_FUNCTION = 'ease-in-quad';
    // const EASING_FUNCTION = 'ease-out-quad';
    // const EASING_FUNCTION = 'ease-in-out-quad';
    // const EASING_FUNCTION = 'ease-in-cubic';
    // const EASING_FUNCTION = 'ease-out-cubic';
    // const EASING_FUNCTION = 'ease-in-out-cubic';
    // const EASING_FUNCTION = 'ease-in-quart';
    // const EASING_FUNCTION = 'ease-out-quart';
    // const EASING_FUNCTION = 'ease-in-out-quart';
    // const EASING_FUNCTION = 'ease-in-quint';
    // const EASING_FUNCTION = 'ease-out-quint';
    // const EASING_FUNCTION = 'ease-in-out-quint';
    // const EASING_FUNCTION = 'ease-in-sine';
    // const EASING_FUNCTION = 'ease-out-sine';
    // const EASING_FUNCTION = 'ease-in-out-sine';
    // const EASING_FUNCTION = 'ease-in-expo';
    // const EASING_FUNCTION = 'ease-out-expo';
    // const EASING_FUNCTION = 'ease-in-out-expo';
    // const EASING_FUNCTION = 'ease-in-circ';
    // const EASING_FUNCTION = 'ease-out-circ';
    // const EASING_FUNCTION = 'ease-in-out-circ';
    // const EASING_FUNCTION = 'ease-in-back';
    // const EASING_FUNCTION = 'ease-out-back';
    // const EASING_FUNCTION = 'ease-in-out-back';
    // END OF ANIMATION CONFIGURATION

    function switchToTab(index) {
      // Fade out current tab
      tabPanes[
        currentIndex
      ].style.transition = `opacity ${FADE_OUT_DURATION}ms ${EASING_FUNCTION}`;
      tabPanes[currentIndex].style.opacity = "0";

      setTimeout(() => {
        // Remove active classes and update ARIA attributes for current tab and pane
        tabLinks[currentIndex].classList.remove("w--current");
        tabLinks[currentIndex].setAttribute("aria-selected", "false");
        tabLinks[currentIndex].setAttribute("tabindex", "-1");
        tabPanes[currentIndex].classList.remove("w--tab-active");

        // Update current index
        currentIndex = index;

        // Add active classes and update ARIA attributes for new current tab and pane
        tabLinks[currentIndex].classList.add("w--current");
        tabLinks[currentIndex].setAttribute("aria-selected", "true");
        tabLinks[currentIndex].setAttribute("tabindex", "0");
        tabPanes[currentIndex].classList.add("w--tab-active");

        // Fade in new tab
        tabPanes[
          currentIndex
        ].style.transition = `opacity ${FADE_IN_DURATION}ms ${EASING_FUNCTION}`;
        tabPanes[currentIndex].style.opacity = "1";

        // Update the data-current attribute on the parent w-tabs element
        const wTabsElement = container.closest(".w-tabs");
        if (wTabsElement) {
          wTabsElement.setAttribute(
            "data-current",
            tabLinks[currentIndex].getAttribute("data-w-tab")
          );
        }
      }, FADE_OUT_DURATION);
    }

    function rotateToNextTab() {
      const nextIndex = (currentIndex + 1) % tabLinks.length;
      switchToTab(nextIndex);
    }

    function startRotation() {
      clearInterval(rotationTimer);
      rotationTimer = setInterval(rotateToNextTab, interval);
    }

    // Add click event listeners to tab links
    tabLinks.forEach((link, index) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        switchToTab(index);
        startRotation(); // Restart rotation from this tab
      });
    });

    // Start the initial rotation
    startRotation();
  });
}

// Run the function when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", initializeTabRotator);

// Start Accordion--------------------------------------------------------------------------------------------------
$(".accordion-item.show > .accordion-content").slideDown();

$(".accordion-title").click(function (e) {
  // Prevent affecting parent accordion when child accordion is clicked
  e.stopPropagation();

  // Get the current accordion item
  var currentItem = $(this).closest(".accordion-item");

  if (currentItem.hasClass("show")) {
    // Collapse the current accordion item
    currentItem.removeClass("show");
    $(this).children(".accordion-dropdown").removeClass("show");
    $(this).siblings(".accordion-content").slideUp();
  } else {
    // Collapse only sibling accordion items at the same level
    currentItem.siblings(".accordion-item").removeClass("show");
    currentItem
      .siblings(".accordion-item")
      .find(".accordion-dropdown")
      .removeClass("show");
    currentItem
      .siblings(".accordion-item")
      .find(".accordion-content")
      .slideUp();

    // Expand the current accordion item
    currentItem.addClass("show");
    $(this).children(".accordion-dropdown").addClass("show");
    $(this).siblings(".accordion-content").slideDown();
  }
});
// End Accordion--------------------------------------------------------------------------------------------------

import "https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js";
import "https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollTrigger.min.js";
import "https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollToPlugin.min.js";
import "https://cdn.jsdelivr.net/npm/split-type@0.3.4/umd/index.min.js";

gsap.registerPlugin(ScrollTrigger);

// Start Parallax Animation-----------------------------------------------------------------------------------------
let parallaxAnimationTrigger = document.querySelectorAll(
  ".parallax-animation-trigger"
);

if (Array.from(parallaxAnimationTrigger).length) {
  parallaxAnimationTrigger.forEach((parallaxAnimationTrigger) => {
    let parallaxAnimationElement = parallaxAnimationTrigger.querySelector(
      ".parallax-animation-element"
    );

    if (parallaxAnimationElement) {
      gsap.fromTo(
        parallaxAnimationElement,
        { y: 200 },
        {
          y: 0,
          ease: "linear",
          scrollTrigger: {
            trigger: parallaxAnimationTrigger,
            start: "top 100%",
            end: "bottom 0%",
            scrub: 1,
            //markers: true,

            //events: onEnter onLeave onEnterBack onLeaveBack
            toggleActions: "restart complete reverse reset",
            //options: play, pause, resume, reset, restart, complete, reverse,none
          },
        }
      );
    }
  });
}
// End Parallax Animation-----------------------------------------------------------------------------------------

// Start Text & icon Revel Animation---------------------------------------------------------------------------------
// Start Text & icon Revel 1 Animation------------------------------------------
let textAnimation = Array.from(document.querySelectorAll(".textanimation"));

if (textAnimation.length) {
  let typeSplit = new SplitType(".textanimation", {
    types: "words",
    tagName: "span",
  });

  let projects = gsap.utils.toArray(".textanimation");

  projects.forEach((project, i) => {
    let span = project.getElementsByClassName("word");
    gsap.fromTo(
      span,
      {
        opacity: 0,
        y: "110%",
      },
      {
        opacity: 1,
        duration: 0.5,
        y: 0,
        stagger: 0.015,
        delay: 0.1,
        scrollTrigger: {
          trigger: project,
          start: "top 60%",
          end: "bottom 10%",
          //markers: true,
          toggleActions: "play none none reverse",
        },
      }
    );
  });
}
// End Text & icon Revel 1 Animation------------------------------------------

// Start Text & icon Revel Animation On Full Section visible ------------------------------------------
let textAnimationFullScreen = Array.from(
  document.querySelectorAll(".textanimation-onfull-screen")
);

if (textAnimationFullScreen.length) {
  let typeSplit = new SplitType(".textanimation-onfull-screen", {
    types: "words",
    tagName: "span",
  });

  let projects = gsap.utils.toArray(".textanimation-onfull-screen");

  projects.forEach((project, i) => {
    let span = project.getElementsByClassName("word");

    // Set `start` dynamically: "top 10%" for the first, "top 40%" for others
    //let startPosition = i === 0 ? "top 10%" : "top 55%";
    let startPosition = "top 55%";

    gsap.fromTo(
      span,
      {
        opacity: 0,
        y: "110%",
      },
      {
        opacity: 1,
        duration: 0.5,
        y: 0,
        stagger: 0.015,
        delay: 0.1,
        scrollTrigger: {
          trigger: project,
          start: startPosition,
          end: "bottom 30%",
          //markers: true,
          toggleActions: "play none none reverse",
        },
      }
    );
  });
}
// End Text & icon Revel Animation On Full Section visible ------------------------------------------

// Home page Herosection Text Revel Animation------------------------------------------
let heroTitleAnimation = Array.from(
  document.querySelectorAll(".hero_title_animation")
);

if (heroTitleAnimation.length) {
  let typeSplitTitle = new SplitType(".hero_title_animation", {
    types: "words",
    tagName: "span",
  });

  let typeSplitTitleProject = gsap.utils.toArray(".hero_title_animation");

  typeSplitTitleProject.forEach((project, i) => {
    let span = project.getElementsByClassName("word");

    // Create a timeline for the animation
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: project,
        start: "top 65%",
        end: "bottom 0%",
        // markers: true,
      },
      delay: 3,
    });

    // Add 1-second delay to the timeline
    tl.to({}, { duration: 1 }); // 1-second empty animation for delay

    // Add the actual text animation after the delay
    tl.fromTo(
      span,
      {
        opacity: 0,
        y: "110%",
      },
      {
        opacity: 1,
        duration: 0.5,
        y: 0,
        stagger: 0.015,
        delay: 0.1, // this delay is for each staggered word animation
      }
    );
  });
}
// End Home page Herosection Text Revel Animation------------------------------------------

// Start Text & icon Revel 2 Animation------------------------------------------
let textAnimation2 = Array.from(document.querySelectorAll(".textanimation2"));

if (textAnimation2.length) {
  let typeSplit2 = new SplitType(".textanimation2", {
    types: "words",
    tagName: "span",
  });

  let projects2 = gsap.utils.toArray(".textanimation2");

  projects2.forEach((project, i) => {
    let span = project.getElementsByClassName("word");

    // Create a timeline for the animation
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: project,
        start: "top 65%",
        end: "bottom 0%",
        // markers: true,
      },
    });

    // Add 1-second delay to the timeline
    tl.to({}, { duration: 1 }); // 1-second empty animation for delay

    // Add the actual text animation after the delay
    tl.fromTo(
      span,
      {
        opacity: 0,
        y: "110%",
      },
      {
        opacity: 1,
        duration: 0.5,
        y: 0,
        stagger: 0.015,
        delay: 0.1, // this delay is for each staggered word animation
      }
    );
  });
}
// End Text & icon Revel 2 Animation------------------------------------------

// Start Text & icon Revel 3 Animation------------------------------------------
let titleAnimation = Array.from(document.querySelectorAll(".title-animation"));

if (titleAnimation.length) {
  let typeSplit3 = new SplitType(".title-animation", {
    tagName: "span",
  });

  let titleAnimation = document.querySelector(".title-animation");
  if (titleAnimation) {
    let span = titleAnimation.getElementsByClassName("char");
    gsap.from(span, {
      opacity: 0,
      duration: 0.5,
      stagger: 0.03,
      scrollTrigger: {
        trigger: titleAnimation,
        start: "top top",
        end: "bottom top",
        //markers: true,
      },
    });
  }
}
// End Text & icon Revel 3 Animation------------------------------------------
// End Text & icon Revel Animation---------------------------------------------------------------------------------

// Start Scale Animation---------------------------------------------------------------------------------
let scaleAnimationElement = Array.from(
  document.querySelectorAll(".scale-animation-element")
);

if (scaleAnimationElement.length) {
  gsap.from(".scale-animation-element", {
    scrollTrigger: {
      trigger: ".scale-animation-trigger",
      scrub: 1,
      //markers: true,
      start: "top 100%",
      end: "bottom 100%",
    },
    scaleX: 0,
    scaleY: 0,
    transformOrigin: "bottom center",
    duration: 1,
    ease: "power1.inOut",
  });
}
// End Scale Animation---------------------------------------------------------------------------------

//--------------------------------------------------------------------------------------------------
let milestoneItemImgContent = Array.from(
  document.querySelectorAll(".milestone-item-img-content")
);

if (milestoneItemImgContent.length) {
  document
    .querySelectorAll(".milestone-item-img-content")
    .forEach((element2) => {
      element2.querySelectorAll(".milestone-item-img").forEach((element) => {
        let targetHeight = element.scrollHeight;
        gsap.set(element, { height: 0 });

        gsap.to(element, {
          height: targetHeight,
          duration: 1,
          scrollTrigger: {
            trigger: element2,
            start: "top 75%",
            end: "top 20%",
            scrub: 1,
            //markers: true,
            onReverseComplete: () => {
              gsap.set(element, { height: 0 });
            },
          },
        });
      });
    });
}
//--------------------------------------------------------------------------------------------------

// Start Video Revel Animation---------------------------------------------------------------------------------
let revelVideoContent = Array.from(
  document.querySelectorAll(".revel-video-content")
);

if (revelVideoContent.length) {
  let videotypeSplit = new SplitType(".revel-video-content", {
    types: "lines",
    tagName: "span",
  });

  let animatevideos = gsap.utils.toArray(".revel-video-content");

  animatevideos.forEach((animatevideo, i) => {
    let spanvideo = animatevideo.getElementsByTagName("span");
    gsap.fromTo(
      spanvideo,
      {
        //"clip-path": "inset(10% 45% 20px 45%)",
        y: "30%",
        scaleX: 0,
        scaleY: 0,
        opacity: 0,
        duration: 0.3,
      },
      {
        //"clip-path": "inset(0px 0% 0px)",
        y: "0%",
        scaleX: 1,
        scaleY: 1,
        opacity: 1,
        duration: 0.3,
        stagger: 0.01,
        scrollTrigger: {
          trigger: animatevideo,
          start: "top 85%",
          end: "top 30%",
          scrub: 1,
        },
      }
    );
  });
}
// End Video Revel Animation---------------------------------------------------------------------------------

// Start Gradient Scale Animation---------------------------------------------------------------------------------
let bgGradientImg = Array.from(document.querySelectorAll(".bg-gradient-img"));

if (bgGradientImg.length) {
  gsap.from(".bg-gradient-img", {
    scrollTrigger: {
      trigger: ".gradient-banner-animation",
      scrub: 1,
      //markers: true,
      start: "top 55%",
      end: "bottom 100%",
    },
    y: 200,
    x: 300,
    scaleX: 0.85,
    scaleY: 0.85,
    transformOrigin: "bottom right",
    duration: 1,
    ease: "power1.inOut",
  });

  const tl = gsap.timeline({
    scrollTrigger: {
      scrub: 1,
      pin: true,
      trigger: ".gradient-banner-animation",
      start: "50% 50%",
      end: "bottom 50%",
    },
  });

  tl.from(".bg-gradient-img", {
    y: 400,
    x: 400,
  });
  tl.to(".bg-gradient-img", {
    y: 0,
    x: 0,
  });
}
// End Gradient Scale Animation---------------------------------------------------------------------------------

// Start Sticky Gradient change position Animation-----------------------------------------------------------------
let stickyGradientSections = Array.from(
  document.querySelectorAll(".sticky-gradient-section")
);

stickyGradientSections.forEach((stickyGradientSection) => {
  stickyGradientSection.querySelectorAll(".sticky-gradient-content-wrapper");

  let contentLength = Array.from(
    stickyGradientSection.querySelectorAll(".sticky-gradient-content")
  ).length;

  stickyGradientSection.style.minHeight = 100 * contentLength + 100 + "vh";
});

if (stickyGradientSections.length) {
  const stickyGradient = gsap.utils.toArray(".sticky-gradient");
  const stickyGradientContent = gsap.utils.toArray(
    ".sticky-gradient-content-wrapper"
  );

  // Pin the sticky section
  ScrollTrigger.create({
    trigger: ".sticky-gradient-section",
    start: "top top",
    end: "bottom bottom",
    // end: () => `bottom-=${window.innerHeight}px`, // Bottom reaches screen height
    pin: ".sticky-gradient-wrapper",
    markers: true,
  });

  // Positions for sticky-gradient-2
  const gradientGreen = [
    { top: "-30%", right: "-40%" }, // index 0
    { top: "30%", right: "-40%" }, // index 1
    { right: "0%", top: "30%" }, // index 2
    { right: "30%", top: "30%" }, // index 3
    { top: "-30%", right: "30%" }, // index 4
    { right: "0%", top: "-30%" }, // index 5
  ];

  // Positions for sticky-gradient:not(.sticky-gradient-2)
  const gradientBlue = [
    { top: "30%", left: "-40%" }, // index 0
    { top: "-30%", left: "-40%" }, // index 1
    { left: "0%", top: "-30%" }, // index 2
    { left: "30%", top: "-30%" }, // index 3
    { left: "30%", top: "30%" }, // index 4
    { left: "0%", top: "30%" }, // index 5
  ];

  // Common animation function to interpolate the positions
  function animateGradientOnScroll(stickyElement, startPos, endPos, progress) {
    gsap.to(stickyElement, {
      top: gsap.utils.interpolate(startPos.top, endPos.top, progress),
      [stickyElement.classList.contains("sticky-gradient-2")
        ? "right"
        : "left"]: gsap.utils.interpolate(
        startPos[
          stickyElement.classList.contains("sticky-gradient-2")
            ? "right"
            : "left"
        ],
        endPos[
          stickyElement.classList.contains("sticky-gradient-2")
            ? "right"
            : "left"
        ],
        progress
      ),
      duration: 0.3,
      ease: "none",
    });
  }

  stickyGradientContent.forEach((title, i) => {
    gsap.set(title, {
      opacity: i === 0 ? 1 : 0, // First element visible initially
    });

    ScrollTrigger.create({
      trigger: title,
      start: "top top",
      end: "bottom top",
      pin: true,
      pinSpacing: false,
      id: i + 1,
      markers: true,
      toggleActions: "play reverse play reverse",

      onUpdate: (self) => {
        let progress = self.progress; // Get the scroll progress

        let stickyGradient2 = gsap.utils.toArray(
          ".sticky-gradient.sticky-gradient-2"
        )[0];
        let stickyGradientNot2 = gsap.utils.toArray(
          ".sticky-gradient:not(.sticky-gradient-2)"
        )[0];

        // Animate the gradient positions based on scroll progress
        animateGradientOnScroll(
          stickyGradient2,
          gradientGreen[i],
          gradientGreen[(i + 1) % gradientGreen.length],
          progress
        );
        animateGradientOnScroll(
          stickyGradientNot2,
          gradientBlue[i],
          gradientBlue[(i + 1) % gradientBlue.length],
          progress
        );
      },

      onEnter: () => {
        gsap.to(title, {
          opacity: 1,
          zIndex: 1,
          duration: 1,
          ease: "power1.inOut",
          overwrite: "auto",
        });
      },

      onLeave: () => {
        gsap.to(title, {
          opacity: stickyGradientContent.length - 1 === i ? 1 : 0,
          zIndex: stickyGradientContent.length - 1 === i ? 1 : 0,
          duration: 0,
          ease: "power1.inOut",
          overwrite: "auto",
        });
      },

      onEnterBack: () => {
        gsap.to(title, {
          opacity: 1,
          zIndex: 1,
          duration: 1,
          ease: "power1.inOut",
          overwrite: "auto",
        });
      },

      onLeaveBack: () => {
        gsap.to(title, {
          opacity: i === 0 ? 1 : 0,
          zIndex: i === 0 ? 1 : 0,
          duration: 0,
          ease: "power1.inOut",
          overwrite: "auto",
        });
      },
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const stickySection = document.querySelector(".sticky-gradient-section");
  const contentWrappers = stickySection.querySelectorAll(
    ".sticky-gradient-section .w-container > div"
  );
  const navDotsContainer = stickySection.querySelector(
    ".sticky-gradient-nav-dots"
  );

  // Create navigation dots dynamically
  contentWrappers.forEach((wrapper, index) => {
    // Assign unique ID to each .sticky-gradient-content-wrapper
    wrapper.setAttribute("id", `sticky-gradient-${index + 1}`);

    // Create navigation dot
    const navDot = document.createElement("a");
    navDot.classList.add("nav-dots-items");
    navDot.setAttribute("href", `#sticky-gradient-${index + 1}`);
    navDotsContainer.appendChild(navDot);

    // Add click event to scroll to the section smoothly
    navDot.addEventListener("click", (event) => {
      event.preventDefault(); // Prevent default anchor link behavior
      const target = document.querySelector(navDot.getAttribute("href"));

      // Smoothly scroll to the section
      target.scrollIntoView({ behavior: "smooth" });

      setTimeout(() => {
        setTimeout(() => {
          window.scrollBy(0, 2); // Scroll 2px down
        }, 1000); // 1 second delay
      }, 1000); // Delay for the duration of the smooth scroll
    });
  });

  // Intersection Observer to track visibility
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const id = entry.target.getAttribute("id");
        const navDot = navDotsContainer.querySelector(`a[href="#${id}"]`);

        // Trigger when 100% of the section is in view
        if (entry.isIntersecting && entry.intersectionRatio === 1) {
          navDotsContainer
            .querySelectorAll(".nav-dots-items")
            .forEach((dot) => {
              dot.classList.remove("active");
            });
          navDot.classList.add("active");
        }
      });
    },
    {
      root: null, // Use the viewport as the root
      threshold: 1, // Trigger when 100% of the section is visible
    }
  );

  // Observe each .sticky-gradient-content-wrapper
  contentWrappers.forEach((wrapper) => observer.observe(wrapper));

  // Update active nav dot on scroll (even for partial visibility)
  window.addEventListener("scroll", () => {
    let activeDotFound = false; // Flag to prevent multiple active dots

    contentWrappers.forEach((wrapper) => {
      const rect = wrapper.getBoundingClientRect();
      const id = wrapper.getAttribute("id");
      const navDot = navDotsContainer.querySelector(`a[href="#${id}"]`);

      if (
        rect.top <= window.innerHeight &&
        rect.bottom >= 0 &&
        !activeDotFound
      ) {
        // Section is visible (even partially)
        navDotsContainer.querySelectorAll(".nav-dots-items").forEach((dot) => {
          dot.classList.remove("active");
        });
        navDot.classList.add("active");

        activeDotFound = true; // Stop once we find the first active dot
      }
    });
  });
});
// End Sticky Gradient change position Animation---------------------------------------------------------------------

// Start Sticky Section Animation---------------------------------------------------------------------------------
let columnWrapper = document.querySelector(".column-wrapper");

if (columnWrapper) {
  const images = gsap.utils.toArray(".column-content.image");
  const titleContainers = gsap.utils.toArray(".column.left .column-content");

  gsap.set(images, {
    opacity: (index) => (index === 0 ? 1 : 0),
    scale: (index) => (index === 0 ? 1.1 : 1),
  });

  ScrollTrigger.create({
    trigger: ".column-wrapper",
    start: "top top",
    end: () => `bottom-=${window.innerHeight}px`, // Bottom reaches screen height
    pin: ".column.right",
    //markers: true,
  });

  titleContainers.forEach((title, i) => {
    ScrollTrigger.create({
      trigger: title,
      start: "top 60%",
      end: "top 70%",
      id: i + 1,
      onEnter: () => {
        gsap.to(images, {
          opacity: (index) => (index === i ? 1 : 0),
          scale: (index) => (index === i ? 1.1 : 1),
          duration: 0.5,
          ease: "power1.inOut",
          overwrite: true,
        });
      },
      onEnterBack: () => {
        gsap.to(images, {
          opacity: (index) => (index === i - 1 ? 1 : 0),
          scale: (index) => (index === i ? 1.1 : 1),
          duration: 0.5,
          ease: "power1.inOut",
          overwrite: true,
        });
      },
    });
  });
}
// End Sticky Section Animation---------------------------------------------------------------------------------

// Start Swipe Animation-----------------------------------------------------------------------------------------
let swipeAnimationTrigger = Array.from(
  document.querySelectorAll(".swipe-animation-trigger")
);
if (window.innerWidth > 991 && swipeAnimationTrigger.length) {
  let allowScroll = true; // sometimes we want to ignore scroll-related stuff, like when an Observer-based section is transitioning.
  let scrollTimeout = gsap.delayedCall(0.1, () => (allowScroll = true)).pause(); // controls how long we should wait after an Observer-based animation is initiated before we allow another scroll-related action
  let currentIndex = 0;
  let swipePanels = gsap.utils.toArray(
    ".swipe-animation-trigger .swipe-animation-element"
  );

  // set z-index & top levels for the swipe panels
  gsap.set(swipePanels, {
    zIndex: (i) => swipePanels.length - i,
    top: (i) => swipePanels.length * i * (100 / swipePanels.length) + "%",
  });

  // create an observer and disable it to start
  let intentObserver = ScrollTrigger.observe({
    type: "wheel,touch",
    onUp: () => allowScroll && gotoPanel(currentIndex - 1, false),
    onDown: () => allowScroll && gotoPanel(currentIndex + 1, true),
    tolerance: 10,
    preventDefault: true,
    onEnable(self) {
      allowScroll = false;
      scrollTimeout.restart(true);
      // when enabling, we should save the scroll position and freeze it. This fixes momentum-scroll on Macs, for example.
      let savedScroll = self.scrollY();
      self._restoreScroll = () => self.scrollY(savedScroll); // if the native scroll repositions, force it back to where it should be
      document.addEventListener("scroll", self._restoreScroll, {
        passive: false,
      });
    },
    onDisable: (self) =>
      document.removeEventListener("scroll", self._restoreScroll),
  });
  intentObserver.disable();

  // handle the panel swipe animations
  function gotoPanel(index, isScrollingDown) {
    // return to normal scroll if we're at the end or back up to the start
    if (
      (index === swipePanels.length && isScrollingDown) ||
      (index === -1 && !isScrollingDown)
    ) {
      intentObserver.disable(); // resume native scroll
      return;
    }
    allowScroll = false;
    scrollTimeout.restart(true);

    // let target = isScrollingDown ? swipePanels[currentIndex] : swipePanels[index];
    gsap.to(swipePanels, {
      yPercent: -100 * index,
      duration: 0.75,
    });

    currentIndex = index;
  }

  // pin swipe section and initiate observer
  ScrollTrigger.create({
    trigger: ".swipe-animation-trigger",
    pin: true,
    //markers: true,
    start: "top 20%",
    end: "top 20%", // just needs to be enough to not risk vibration where a user's fast-scroll shoots way past the end
    onEnter: (self) => {
      if (intentObserver.isEnabled) {
        return;
      } // in case the native scroll jumped past the end and then we force it back to where it should be.
      self.scroll(self.start + 1); // jump to just one pixel past the start of this section so we can hold there.
      intentObserver.enable(); // STOP native scrolling
    },
    onEnterBack: (self) => {
      if (intentObserver.isEnabled) {
        return;
      } // in case the native scroll jumped backward past the start and then we force it back to where it should be.
      self.scroll(self.end - 1); // jump to one pixel before the end of this section so we can hold there.
      intentObserver.enable(); // STOP native scrolling
    },
  });
}
// End Swipe Animation-----------------------------------------------------------------------------------------

// Start Btn Hover Animation-----------------------------------------------------------------------------------------
let btnHover = Array.from(document.querySelectorAll(".btn-hover"));

if (btnHover.length) {
  const buttons = gsap.utils.toArray(".btn-hover");
  buttons.forEach((item) => {
    let span = item.querySelector("span");
    let tl = gsap.timeline({ paused: true });

    tl.to(span, { duration: 0.2, yPercent: -150, ease: "power2.in" });
    tl.set(span, { yPercent: 150 });
    tl.to(span, { duration: 0.2, yPercent: 0 });

    item.addEventListener("mouseenter", () => tl.play(0));
  });
}
// End Btn Hover Animation-----------------------------------------------------------------------------------------

import "https://rglhpcjp-5500.inc1.devtunnels.ms/createMe-animatiom.js";

// /* <!-- Start Splide JS--------------------------------------------------------------------------------------------------> */
import "https://cdn.jsdelivr.net/npm/@splidejs/splide@4.1.4/dist/js/splide.min.js";

let splide = Array.from(document.querySelectorAll(".splide"));

if (splide.length) {
  document.addEventListener("DOMContentLoaded", function () {
    var splide = new Splide(".splide", {
      type: "fade",
      perPage: 1,
      perMove: 1,
      pagination: false,
      rewind: true,
    });
    splide.mount();
  });
}

// /* <!-- End Splide JS--------------------------------------------------------------------------------------------------> */
