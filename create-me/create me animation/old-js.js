import "https://code.jquery.com/jquery-3.5.1.min.js";

// <!-- Start Nice Select------------------------------------------------------------------------------------------------>
import "https://cdnjs.cloudflare.com/ajax/libs/jquery-nice-select/1.1.0/js/jquery.nice-select.js";

$(document).ready(function () {
  $("select").niceSelect();
});
// <!-- End Nice Select------------------------------------------------------------------------------------------------>

// <!-- Start Home top bar--------------------------------------------------------------------------------------------->
const marquee = document.querySelector(".marquee");
const container = document.querySelector(".marquee-container");

container.addEventListener("mouseenter", () => {
  marquee.style.animationPlayState = "paused";
});

container.addEventListener("mouseleave", () => {
  marquee.style.animationPlayState = "running";
});

container.addEventListener("focus", () => {
  marquee.style.animationPlayState = "paused";
});

container.addEventListener("blur", () => {
  marquee.style.animationPlayState = "running";
});
// <!-- End Home top bar--------------------------------------------------------------------------------------------->

// <!-- Start header height------------------------------------------------------------------------------------------>
const header = document.querySelector("header");

function updateHeaderHeight() {
  let headerHeight = header.offsetHeight;
  document.documentElement.style.setProperty("--header-height", headerHeight + "px");
}
updateHeaderHeight();
window.addEventListener("resize", updateHeaderHeight);
// <!-- End header height------------------------------------------------------------------------------------------>

// <!-- Start auto-rotating tabs ------------------------------------------------------------------------------------>
// Function to rotate tabs
function initializeTabRotator() {
  // Find all tab containers with the ms-code-rotate-tabs attribute
  const tabContainers = document.querySelectorAll("[ms-code-rotate-tabs]");

  tabContainers.forEach((container) => {
    const interval = parseInt(container.getAttribute("ms-code-rotate-tabs"), 10);
    const tabLinks = container.querySelectorAll(".w-tab-link");
    const tabContent = container.closest(".w-tabs").querySelector(".w-tab-content");
    const tabPanes = tabContent.querySelectorAll(".w-tab-pane");
    let currentIndex = Array.from(tabLinks).findIndex((link) => link.classList.contains("w--current"));
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
      tabPanes[currentIndex].style.transition = `opacity ${FADE_OUT_DURATION}ms ${EASING_FUNCTION}`;
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
        tabPanes[currentIndex].style.transition = `opacity ${FADE_IN_DURATION}ms ${EASING_FUNCTION}`;
        tabPanes[currentIndex].style.opacity = "1";

        // Update the data-current attribute on the parent w-tabs element
        const wTabsElement = container.closest(".w-tabs");
        if (wTabsElement) {
          wTabsElement.setAttribute("data-current", tabLinks[currentIndex].getAttribute("data-w-tab"));
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
// <!-- End auto-rotating tabs ------------------------------------------------------------------------------------>

// <!-- Start Accordion---------------------------------------------------------------------------------------------->
$(".accordion-item.show > .accordion-content").slideDown();

$(".accordion-title").click(function (e) {
  // Prevent affecting parent accordion when child accordion is clicked
  e.stopPropagation();

  // Get the current accordion item
  var currentItem = $(this).closest(".accordion-item");

  if (currentItem.hasClass("show")) {
    // Collapse the current accordion item
    currentItem.removeClass("show");
    $(this).siblings(".accordion-content").slideUp();
  } else {
    // Collapse only sibling accordion items at the same level
    currentItem.siblings(".accordion-item").removeClass("show");
    currentItem.siblings(".accordion-item").find(".accordion-content").slideUp();

    // Expand the current accordion item
    currentItem.addClass("show");
    $(this).siblings(".accordion-content").slideDown();
  }
});

$(".inner-accordion-title").click(function (e) {
  e.stopPropagation();

  $(".accordion-item").removeClass("show");
  $(".accordion-content").slideUp();

  let mainCollapsibleId = parseInt($(this).attr("data-main-collapsible-id"));
  let childCollapsibleId = parseInt($(this).attr("data-child-collapsible-id"));

  // Select the correct parent collapsible
  const parentCollapsible = $(".faqs-parent-item").eq(mainCollapsibleId);
  parentCollapsible.addClass("show");
  parentCollapsible.children(".accordion-content").first().slideDown();

  // Find the correct child collapsible
  let selectedAccordionItem = $(parentCollapsible.find(".accordion-item")[childCollapsibleId]);
  selectedAccordionItem.addClass("show");
  selectedAccordionItem.children(".accordion-content").first().slideDown();
});
// <!-- End Accordion---------------------------------------------------------------------------------------------->

// <!-- Start gsap animation--------------------------------------------------------------------------------------------->
import "https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js";
import "https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollTrigger.min.js";
import "https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollToPlugin.min.js";
import "https://cdn.jsdelivr.net/npm/split-type@0.3.4/umd/index.min.js";

gsap.registerPlugin(ScrollTrigger);

// Start Parallax Animation-----------------------------------------------------------------------------------------
let parallaxAnimationTrigger = document.querySelectorAll(".parallax-animation-trigger");

if (Array.from(parallaxAnimationTrigger).length) {
  parallaxAnimationTrigger.forEach((parallaxAnimationTrigger) => {
    let parallaxAnimationElement = parallaxAnimationTrigger.querySelector(".parallax-animation-element");

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
let textAnimationFullScreen = Array.from(document.querySelectorAll(".textanimation-onfull-screen"));

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
let heroTitleAnimation = Array.from(document.querySelectorAll(".hero_title_animation"));

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

// Start Text & icon Revel Title Animation------------------------------------------
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
// End Text & icon Revel Title Animation------------------------------------------

// Start Text & icon Revel 3 Animation------------------------------------------
let textAnimation3 = Array.from(document.querySelectorAll(".textanimation3"));

if (textAnimation3.length) {
  let typeSplit = new SplitType(".textanimation3", {
    types: "words",
    tagName: "span",
  });

  let projects = gsap.utils.toArray(".textanimation3");

  projects.forEach((project, i) => {
    // If window.innerHeight is greater than 829, skip the scrollTrigger
    if (window.innerWidth > 767 && window.innerHeight <= 830) {
      return; // Skip the animation for this element
    }

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
          //   start:
          //     i === 0
          //       ? "top 60%"
          //       : window.innerWidth <= 767
          //       ? "top 60%"
          //       : window.innerHeight <= 830
          //       ? "top 60%"
          //       : "top top",
          //   end:
          //     i === 0
          //       ? "bottom 10%"
          //       : window.innerWidth <= 767
          //       ? "bottom 10%"
          //       : window.innerHeight <= 830
          //       ? "bottom 10%"
          //                     : "bottom bottom",
          start: i === 0 ? "top 60%" : window.innerWidth <= 767 ? "top 60%" : "top top",
          end: i === 0 ? "bottom 10%" : window.innerWidth <= 767 ? "bottom 10%" : "bottom bottom",
          //   markers: true,
          toggleActions: "play none none reverse",
        },
      }
    );
  });
}
// End Text & icon Revel 3 Animation------------------------------------------
// End Text & icon Revel Animation---------------------------------------------------------------------------------

//--------------------------------------------------------------------------------------------------
let milestoneItemImgContent = Array.from(document.querySelectorAll(".milestone-item-img-content"));

if (milestoneItemImgContent.length) {
  document.querySelectorAll(".milestone-item-img-content").forEach((element2) => {
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
let revelVideoTargets = document.querySelectorAll(".revel-video-target");

if (revelVideoTargets.length) {
  revelVideoTargets.forEach((revelVideoTarget) => {
    let revelVideoContent = revelVideoTarget.querySelector(".revel-video-content");

    gsap.fromTo(
      revelVideoContent,
      {
        y: "30%",
        scaleX: 0,
        scaleY: 0,
        opacity: 0,
        duration: 0.3,
      },
      {
        y: "0%",
        scaleX: 1,
        scaleY: 1,
        opacity: 1,
        duration: 0.3,
        stagger: 0.01,
        scrollTrigger: {
          trigger: revelVideoTarget,
          start: "top 85%",
          end: "top 25%",
          scrub: 1,
          // markers: true,

          onEnter: () => revelVideoContent.classList.remove("pointer-events-none"),
          onLeaveBack: () => revelVideoContent.classList.add("pointer-events-none"),
        },
      }
    );
  });
}
// End Video Revel Animation---------------------------------------------------------------------------------

// Start Sticky Gradient change position Animation-----------------------------------------------------------------
// let stickyGradientSections = Array.from(document.querySelectorAll(".sticky-gradient-section"));

// if (stickyGradientSections.length) {
//   stickyGradientSections.forEach((stickyGradientSection) => {
//     stickyGradientSection.querySelectorAll(".sticky-gradient-content-wrapper");

//     let contentLength = Array.from(stickyGradientSection.querySelectorAll(".sticky-gradient-content")).length;

//     stickyGradientSection.style.minHeight = 50 * contentLength + 50 + 50 + "vh";
//   });

//   if (stickyGradientSections.length) {
//     const stickyGradient = gsap.utils.toArray(".sticky-gradient");
//     const stickyGradientContent = gsap.utils.toArray(".sticky-gradient-content-wrapper");

//     // Pin the sticky section
//     ScrollTrigger.create({
//       trigger: ".sticky-gradient-section",
//       start: "top top",
//       end: "bottom bottom",
//       // end: () => `bottom-=${window.innerHeight}px`, // Bottom reaches screen height
//       pin: ".sticky-gradient-wrapper",
//       //   markers: true,
//     });

//     // Positions for sticky-gradient-2
//     const gradientGreen = [
//       { top: "-30%", right: "-40%" }, // index 0
//       { top: "30%", right: "-40%" }, // index 1
//       { right: "0%", top: "30%" }, // index 2
//       { right: "30%", top: "30%" }, // index 3
//       { top: "-30%", right: "30%" }, // index 4
//       { right: "0%", top: "-30%" }, // index 5
//     ];

//     // Positions for sticky-gradient:not(.sticky-gradient-2)
//     const gradientBlue = [
//       { top: "30%", left: "-40%" }, // index 0
//       { top: "-30%", left: "-40%" }, // index 1
//       { left: "0%", top: "-30%" }, // index 2
//       { left: "30%", top: "-30%" }, // index 3
//       { left: "30%", top: "30%" }, // index 4
//       { left: "0%", top: "30%" }, // index 5
//     ];

//     // Common animation function to interpolate the positions
//     function animateGradientOnScroll(stickyElement, startPos, endPos, progress) {
//       gsap.to(stickyElement, {
//         top: gsap.utils.interpolate(startPos.top, endPos.top, progress),
//         [stickyElement.classList.contains("sticky-gradient-2") ? "right" : "left"]: gsap.utils.interpolate(startPos[stickyElement.classList.contains("sticky-gradient-2") ? "right" : "left"], endPos[stickyElement.classList.contains("sticky-gradient-2") ? "right" : "left"], progress),
//         duration: 0.3,
//         ease: "none",
//       });
//     }

//     const stickyGradientSections = document.querySelectorAll(".sticky-gradient-section");

//     stickyGradientSections.forEach((stickyGradientSection) => {
//       // Select all sticky gradient content wrappers (slides)
//       const stickyGradientContentWrappers = stickyGradientSection.querySelectorAll(".sticky-gradient-content-wrapper");

//       // Calculate total slides
//       const totalSlides = stickyGradientContentWrappers.length;

//       stickyGradientContent.forEach((title, i) => {
//         gsap.set(title, {
//           opacity: i === 0 ? 1 : 0, // First element visible initially
//         });

//         let isLastSlide = i === totalSlides - 1; // Check if it's the last slide

//         ScrollTrigger.create({
//           trigger: title,
//           start: "top top",
//           end: "bottom top",
//           pin: true, // Pin all
//           //   pin: !isLastSlide, // Pin all except the last one
//           pinSpacing: isLastSlide, // Maintain spacing for the last slide
//           id: i + 1,
//           //   markers: true,
//           toggleActions: "play reverse play reverse",

//           onUpdate: (self) => {
//             let progress = self.progress; // Get the scroll progress

//             let stickyGradient2 = gsap.utils.toArray(".sticky-gradient.sticky-gradient-2")[0];
//             let stickyGradientNot2 = gsap.utils.toArray(".sticky-gradient:not(.sticky-gradient-2)")[0];

//             // Animate the gradient positions based on scroll progress
//             animateGradientOnScroll(stickyGradient2, gradientGreen[i], gradientGreen[(i + 1) % gradientGreen.length], progress);
//             animateGradientOnScroll(stickyGradientNot2, gradientBlue[i], gradientBlue[(i + 1) % gradientBlue.length], progress);
//           },

//           onEnter: () => {
//             gsap.to(title, {
//               opacity: 1,
//               zIndex: 1,
//               duration: 1,
//               ease: "power2.inOut",
//               overwrite: "auto",
//             });
//           },

//           onLeave: () => {
//             gsap.to(title, {
//               opacity: stickyGradientContent.length - 1 === i ? 1 : 0,
//               zIndex: stickyGradientContent.length - 1 === i ? 1 : 0,
//               duration: 0,
//               ease: "power1.inOut",
//               overwrite: "auto",
//             });
//           },

//           onEnterBack: () => {
//             gsap.to(title, {
//               opacity: 1,
//               zIndex: 1,
//               duration: 1,
//               ease: "power2.inOut",
//               overwrite: "auto",
//             });
//           },

//           onLeaveBack: () => {
//             gsap.to(title, {
//               opacity: i === 0 ? 1 : 0,
//               zIndex: i === 0 ? 1 : 0,
//               duration: 0,
//               ease: "power1.inOut",
//               overwrite: "auto",
//             });
//           },
//         });
//       });
//     });
//   }

//   document.addEventListener("DOMContentLoaded", () => {
//     const stickySection = document.querySelector(".sticky-gradient-section");
//     const contentWrappers = stickySection.querySelectorAll(".sticky-gradient-section .w-container > div");
//     const navDotsContainer = stickySection.querySelector(".sticky-gradient-nav-dots");

//     // Create navigation dots dynamically
//     contentWrappers.forEach((wrapper, index) => {
//       // Assign unique ID to each .sticky-gradient-content-wrapper
//       wrapper.setAttribute("id", `sticky-gradient-${index + 1}`);

//       // Create navigation dot
//       const navDot = document.createElement("a");
//       navDot.classList.add("nav-dots-items");
//       navDot.setAttribute("href", `#sticky-gradient-${index + 1}`);
//       navDotsContainer.appendChild(navDot);

//       // Add click event to scroll to the section smoothly
//       navDot.addEventListener("click", (event) => {
//         event.preventDefault(); // Prevent default anchor link behavior
//         const target = document.querySelector(navDot.getAttribute("href"));

//         // Smoothly scroll to the section
//         target.scrollIntoView({ behavior: "smooth" });

//         const direction = "down"; // or 'down'
//         setTimeout(() => {
//           setTimeout(() => {
//             window.scrollBy(0, 2);
//           }, 1000);
//         }, 1000);
//       });
//     });

//     // Intersection Observer to track visibility
//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           const id = entry.target.getAttribute("id");
//           const navDot = navDotsContainer.querySelector(`a[href="#${id}"]`);

//           // Trigger when 100% of the section is in view
//           if (entry.isIntersecting && entry.intersectionRatio === 1) {
//             navDotsContainer.querySelectorAll(".nav-dots-items").forEach((dot) => {
//               dot.classList.remove("active");
//             });
//             navDot.classList.add("active");
//           }
//         });
//       },
//       {
//         root: null, // Use the viewport as the root
//         threshold: 1, // Trigger when 100% of the section is visible
//       }
//     );

//     // Observe each .sticky-gradient-content-wrapper
//     contentWrappers.forEach((wrapper) => observer.observe(wrapper));

//     // Update active nav dot on scroll (even for partial visibility)
//     window.addEventListener("scroll", () => {
//       let activeDotFound = false; // Flag to prevent multiple active dots

//       contentWrappers.forEach((wrapper) => {
//         const rect = wrapper.getBoundingClientRect();
//         const id = wrapper.getAttribute("id");
//         const navDot = navDotsContainer.querySelector(`a[href="#${id}"]`);

//         if (rect.top <= window.innerHeight && rect.bottom >= 0 && !activeDotFound) {
//           // Section is visible (even partially)
//           navDotsContainer.querySelectorAll(".nav-dots-items").forEach((dot) => {
//             dot.classList.remove("active");
//           });
//           navDot.classList.add("active");

//           activeDotFound = true; // Stop once we find the first active dot
//         }
//       });
//     });
//   });
// }

let stickyGradientSections = Array.from(document.querySelectorAll(".sticky-gradient-section"));

if (stickyGradientSections.length) {
  stickyGradientSections.forEach((stickyGradientSection) => {
    stickyGradientSection.querySelectorAll(".sticky-gradient-content-wrapper");
    let contentLength = Array.from(stickyGradientSection.querySelectorAll(".sticky-gradient-content")).length;
    stickyGradientSection.style.minHeight = 50 * contentLength + 50 + 50 + "vh";
  });

  if (stickyGradientSections.length) {
    const stickyGradientContent = gsap.utils.toArray(".sticky-gradient-content-wrapper");

    ScrollTrigger.create({
      trigger: ".sticky-gradient-section",
      start: "top top",
      end: "bottom bottom",
      pin: ".sticky-gradient-wrapper",
      //markers: true,
    });

    function animateGradientOnScroll(stickyElement, startPos, endPos, progress) {
      gsap.to(stickyElement, {
        top: gsap.utils.interpolate(startPos.top, endPos.top, progress),
        [stickyElement.classList.contains("sticky-gradient-2") ? "right" : "left"]: gsap.utils.interpolate(startPos[stickyElement.classList.contains("sticky-gradient-2") ? "right" : "left"], endPos[stickyElement.classList.contains("sticky-gradient-2") ? "right" : "left"], progress),
        duration: 0.3,
        ease: "none",
      });
    }

    const stickyGradientSections = document.querySelectorAll(".sticky-gradient-section");

    stickyGradientSections.forEach((stickyGradientSection) => {
      stickyGradientContent.forEach((title, i) => {
        ScrollTrigger.create({
          trigger: title,
          start: i === 0 ? "top top" : "top 40%",
          end: "bottom 35%",
          id: i + 1,
          toggleActions: "play reverse play reverse",

          onEnter: () => {
            gsap.to(title, {
              opacity: 1,
              zIndex: 1,
              duration: 0.5,
              ease: "power2.inOut",
              overwrite: "auto",
            });
          },

          onLeave: () => {
            gsap.to(title, {
              opacity: stickyGradientContent.length - 1 === i ? 1 : 0,
              zIndex: stickyGradientContent.length - 1 === i ? 1 : 0,
              duration: 0.5,
              ease: "power1.inOut",
              overwrite: "auto",
            });
          },

          onEnterBack: () => {
            gsap.to(title, {
              opacity: 1,
              zIndex: 1,
              duration: 0.5,
              ease: "power2.inOut",
              overwrite: "auto",
            });
          },

          onLeaveBack: () => {
            gsap.to(title, {
              opacity: i === 0 ? 1 : 0,
              zIndex: i === 0 ? 1 : 0,
              duration: 0.5,
              ease: "power1.inOut",
              overwrite: "auto",
            });
          },
        });
      });
    });
  }
}
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
// <!-- End gsap animation--------------------------------------------------------------------------------------------->

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
