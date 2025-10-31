// <!-- Start header height------------------------------------------------------------------------------------------>
const header = document.querySelector("header");

function updateHeaderHeight() {
  let headerHeight = header.offsetHeight;
  document.documentElement.style.setProperty("--header-height", headerHeight + "px");
}
updateHeaderHeight();
window.addEventListener("resize", updateHeaderHeight);
// <!-- End header height------------------------------------------------------------------------------------------>

// <!-- Start Icon Content New Page Animation------------------------------------------------------------------------>
let animationScrollSections = document.querySelectorAll(".animation-scroll-section");

if (animationScrollSections.length) {
  $(window).on("resize", function () {
    if (window.innerWidth > 767 || window.innerHeight > 830) {
      location.reload();
    }
  });

  if (window.innerWidth > 767) {
    if (window.innerHeight > 830) {
      // Start set section height
      animationScrollSections.forEach((animationScrollSection) => {
        let contentLength = Array.from(animationScrollSection.querySelectorAll(".hero-section")).length;

        animationScrollSection.style.minHeight = 100 * contentLength + 100 + "vh";
      });

      const animationScrollItem = gsap.utils.toArray(".animation-scroll-section .hero-section");

      // Set default values = Index 0
      gsap.set(".bar-wrapper-1", { width: "0%" });
      gsap.set(".animation-dot-wrapper", { left: "0%" });

      // Set default values = Index 1
      gsap.set(".animation-content-wrapper-2", {
        transform: "translateY(100%)",
        opacity: 0,
      });
      const contentItems = gsap.utils.toArray(".animation-content-wrapper-2 .content-item");
      gsap.set(contentItems, {
        transform: (index) => (index === 0 ? "" : "translateY(100%)"),
      });
      gsap.set(".bar-wrapper-2", { width: "0%" });
      gsap.set(".dot-wrapper-2", { left: "0%" });

      // Set default values = Index 2
      gsap.set(".img-hide-wrapper-1", { width: "100%" });
      gsap.set(".img-hide-wrapper-2", { width: "100%" });

      animationScrollItem.forEach((title, i) => {
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
          toggleActions: "play reverse play reverse",
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
              opacity: animationScrollItem.length - 1 === i ? 1 : 0,
              zIndex: animationScrollItem.length - 1 === i ? 1 : 0,
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

        if (i === 0) {
          gsap.to(".bar-wrapper-1", {
            width: "100%",
            ease: "none",
            scrollTrigger: {
              trigger: title,
              start: "top top",
              end: "bottom 30%",
              scrub: 1,
            },
          });

          gsap.to(".animation-dot-wrapper", {
            left: "100%",
            ease: "none",
            scrollTrigger: {
              trigger: title,
              start: "top top",
              end: "bottom 30%",
              scrub: 1,
            },
          });
        }

        if (i === 1) {
          gsap.to(".animation-content-wrapper-2", {
            duration: 1,
            y: 0,
            opacity: 1,
            stagger: 0.015,
            delay: 0.2,
            scrollTrigger: {
              trigger: title,
              start: "top top",
              end: "bottom bottom",
              toggleActions: "play none none reverse",
            },
          });

          gsap.to(".bar-wrapper-2", {
            width: "100%",
            ease: "none",
            scrollTrigger: {
              trigger: title,
              start: "top top",
              end: "bottom 30%",
              scrub: 1,
              onUpdate: (self) => {
                let progress = self.progress;
                if (progress <= 0.33) {
                  gsap.to(".animation-2-dot-wrapper-2", {
                    left: progress * 101 + "%",
                  });
                  gsap.to(".animation-2-dot-wrapper-3", {
                    left: progress * 101 + "%",
                  });
                  gsap.to(".animation-2-dot-wrapper-4", {
                    left: progress * 101 + "%",
                  });
                }
                if (progress > 0.33 && progress <= 0.66) {
                  gsap.to(".animation-2-dot-wrapper-3", {
                    left: progress * 101 + "%",
                  });
                  gsap.to(".animation-2-dot-wrapper-4", {
                    left: progress * 101 + "%",
                  });
                }
                if (progress > 0.66 && progress <= 1) {
                  gsap.to(".animation-2-dot-wrapper-4", {
                    left: progress * 100 + "%",
                  });
                }
                if (progress >= 0.33 && progress < 0.66) {
                  gsap.to(contentItems[1], { y: 0, opacity: 1, duration: 1 });
                } else if (progress >= 0.66 && progress < 1) {
                  gsap.to(contentItems[2], { y: 0, opacity: 1, duration: 1 });
                } else if (progress >= 1) {
                  gsap.to(contentItems[3], { y: 0, opacity: 1, duration: 1 });
                }
                if (progress < 0.33) {
                  gsap.to(contentItems[1], {
                    y: "100%",
                    opacity: 0,
                    duration: 1,
                  });
                } else if (progress < 0.66) {
                  gsap.to(contentItems[2], {
                    y: "100%",
                    opacity: 0,
                    duration: 1,
                  });
                } else if (progress < 1) {
                  gsap.to(contentItems[3], {
                    y: "100%",
                    opacity: 0,
                    duration: 1,
                  });
                }
              },
            },
          });
        }

        if (i === 2) {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: title,
              start: "top top",
              end: "bottom 30%",
              scrub: 1,
            },
          });

          tl.to(".img-hide-wrapper-1", { width: "0%", ease: "none" });
          tl.to(".img-hide-wrapper-2", { width: "0%", ease: "none" }, "-=0");
        }
      });
    }
  } else {
    const animationScrollItem = gsap.utils.toArray(".animation-scroll-section .hero-section");

    // Set default values = Index 0
    gsap.set(".bar-wrapper-1", { height: "0%" });
    gsap.set(".animation-dot-wrapper", { top: "0%" });

    // Set default values = Index 1
    const contentItems = gsap.utils.toArray(".animation-content-wrapper-2 .content-item");
    gsap.set(contentItems, {
      transform: (index) => (index === 0 ? "" : "translateX(-100%)"),
    });
    gsap.set(".bar-wrapper-2", { height: "0%" });
    gsap.set(".dot-wrapper-2", { top: "0%" });

    // Set default values = Index 2
    gsap.set(".img-hide-wrapper", { height: "100%" });

    animationScrollItem.forEach((title, i) => {
      ScrollTrigger.create({
        trigger: title,
        start: "top 50%",
        end: "bottom 50%",
        id: i + 1,
        // markers: true,
      });

      if (i === 0) {
        gsap.to(".bar-wrapper-1", {
          height: "100%",
          ease: "none", // Smoothly follows scroll
          scrollTrigger: {
            trigger: ".animation-content-wrapper",
            start: "top 60%",
            end: "bottom 60%",
            scrub: 1, // Animates while scrolling
            // markers: true,
          },
        });

        gsap.to(".animation-dot-wrapper", {
          top: "100%",
          ease: "none", // Smoothly follows scroll
          scrollTrigger: {
            trigger: ".animation-content-wrapper",
            start: "top 60%",
            end: "bottom 60%",
            scrub: 1, // Animates while scrolling
            // markers: true,
          },
        });
      }

      if (i === 1) {
        gsap.to(".bar-wrapper-2", {
          height: "100%", // Change width to height for vertical animation
          ease: "none",
          scrollTrigger: {
            trigger: ".animation-content-wrapper-2",
            start: "top 60%",
            end: "bottom 60%",
            scrub: 1,
            // markers: true,
            onUpdate: (self) => {
              let progress = self.progress; // Get scroll progress (0 to 1)

              console.log(progress);

              // Move dots vertically instead of horizontally
              if (progress < 0.33) {
                gsap.to(".animation-2-dot-wrapper-2", {
                  top: progress * 100 + "%",
                });
                gsap.to(".animation-2-dot-wrapper-3", {
                  top: progress * 100 + "%",
                });
                gsap.to(".animation-2-dot-wrapper-4", {
                  top: progress * 100 + "%",
                });
              }

              if (progress >= 0.33 && progress < 0.66) {
                gsap.to(".animation-2-dot-wrapper-3", {
                  top: progress * 100 + "%",
                });
                gsap.to(".animation-2-dot-wrapper-4", {
                  top: progress * 100 + "%",
                });
              }

              if (progress >= 0.66 && progress <= 1) {
                gsap.to(".animation-2-dot-wrapper-4", {
                  top: progress * 100 + "%",
                });
              }

              // Handle visibility and vertical movement of content items
              if (progress >= 0.33 && progress < 0.66) {
                gsap.to(contentItems[1], { x: 0, opacity: 1, duration: 1 });
              } else if (progress >= 0.66 && progress < 1) {
                gsap.to(contentItems[2], { x: 0, opacity: 1, duration: 1 });
              } else if (progress >= 1) {
                gsap.to(contentItems[3], { x: 0, opacity: 1, duration: 1 });
              }

              // Reverse the animation when scrolling back
              if (progress < 0.33) {
                gsap.to(contentItems[1], {
                  x: "-100%",
                  opacity: 0,
                  duration: 1,
                });
              } else if (progress < 0.66) {
                gsap.to(contentItems[2], {
                  x: "-100%",
                  opacity: 0,
                  duration: 1,
                });
              } else if (progress < 1) {
                gsap.to(contentItems[3], {
                  x: "-100%",
                  opacity: 0,
                  duration: 1,
                });
              }
            },
          },
        });
      }

      if (i === 2) {
        gsap.utils.toArray(".img-hide-wrapper").forEach((element) => {
          gsap.to(element, {
            height: "0%",
            ease: "none",
            scrollTrigger: {
              trigger: element, // Uses each wrapper as the trigger
              start: "top 60%",
              end: "bottom 60%",
              scrub: 1,
              // markers: true,
            },
          });
        });
      }
    });
  }
}
// <!-- End Icon Content New Page Animation------------------------------------------------------------------------>

let themeBannerSection = document.querySelectorAll(".theme-banner-section");

if (themeBannerSection.length) {
  $(window).on("resize", function () {
    if (window.innerWidth > 767 || window.innerHeight > 830) {
      location.reload();
    }
  });
}

// <!-- Start banner animation 1------------------------------------------------------------------------>
let themeBanner1 = document.querySelectorAll(".theme-banner-section-1");

if (themeBanner1.length) {
  if (window.innerWidth > 767) {
    if (window.innerHeight > 830) {
      // Set default values
      const elementsToSet = [
        { selector: ".banner-animation-2-bar", props: { width: "0%" } },
        { selector: ".banner-animation-2-bar-dot", props: { opacity: 0 } },
        {
          selector: ".banner-animation-2-bar + .banner-animation-main-title-2",
          props: { opacity: 0 },
        },
        {
          selector: ".banner-animation-3 .banner-animation-main-title",
          props: { opacity: 0 },
        },
        { selector: ".banner-animation-2-bar-2", props: { width: "0%" } },
        {
          selector: ".banner-animation-2-wrapper-2 .banner-animation-main-title-2",
          props: { opacity: 0 },
        },
        { selector: ".banner-bar-wrapper", props: { width: "0%" } },
        { selector: ".banner-rotate-content", props: { opacity: 0 } },
      ];

      // Apply values set for each element
      elementsToSet.forEach(({ selector, props }) => gsap.set(selector, props));

      // Handle animation items
      const contentItems = gsap.utils.toArray(".banner-animation-list-2 .banner-animation-item");
      gsap.set(contentItems, { y: "100%", opacity: 0 });

      ScrollTrigger.create({
        trigger: themeBanner1,
        start: "top top",
        end: "bottom top",
        pin: true,
        markers: true,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: themeBanner1,
          start: "top top",
          end: "bottom 20%",
          scrub: 1,
          markers: true,
        },
      });

      tl.to(".banner-animation-2-bar", {
        width: "100%",
        ease: "none",
        onUpdate: function () {
          // Use a regular function to access `this`
          if (this.progress() === 1) {
            gsap.to(".banner-animation-2-bar-dot", { opacity: 1 });
            gsap.to(".banner-animation-2-bar + .banner-animation-main-title-2", { opacity: 1 });
            gsap.to(".banner-animation-3 .banner-animation-main-title", {
              opacity: 1,
            });
            gsap.to(contentItems[0], { y: 0, opacity: 1 });
          } else {
            gsap.to(".banner-animation-2-bar-dot", { opacity: 0 });
            gsap.to(".banner-animation-2-bar + .banner-animation-main-title-2", { opacity: 0 });
            gsap.to(".banner-animation-3 .banner-animation-main-title", {
              opacity: 0,
            });
            gsap.to(contentItems[0], { y: "100%", opacity: 0 });
          }
        },
      });

      tl.to(".banner-animation-2-bar-2", {
        width: "100%",
        ease: "none",
        onUpdate: function () {
          let progress = this.progress();

          if (progress == 1) {
            gsap.to(".banner-animation-2-wrapper-2 .banner-animation-main-title-2", { opacity: 1 });
          } else {
            gsap.to(".banner-animation-2-wrapper-2 .banner-animation-main-title-2", { opacity: 0 });
          }

          if (progress >= 0.28 && progress < 0.58) {
            gsap.to(contentItems[1], { y: 0, opacity: 1 });
          } else if (progress >= 0.58 && progress < 0.78) {
            gsap.to(contentItems[2], { y: 0, opacity: 1 });
          } else if (progress >= 0.78) {
            gsap.to(contentItems[3], { y: 0, opacity: 1 });
          }

          if (progress < 0.28) {
            gsap.to(contentItems[1], { y: "100%", opacity: 0 });
          } else if (progress < 0.58) {
            gsap.to(contentItems[2], { y: "100%", opacity: 0 });
          } else if (progress < 0.78) {
            gsap.to(contentItems[3], { y: "100%", opacity: 0 });
          }
        },
      });

      tl.to(".banner-bar-wrapper", {
        width: "100%",
        ease: "none",
        onUpdate: function () {
          // Use a regular function to access `this`
          if (this.progress() >= 0.98) {
            gsap.to(".banner-rotate-content", { opacity: 1 });
          } else {
            gsap.to(".banner-rotate-content", { opacity: 0 });
          }

          if (this.progress() === 1) {
            document.querySelector(".banner-rotate-content").classList.add("rotate-animation-start");
          } else {
            document.querySelector(".banner-rotate-content").classList.remove("rotate-animation-start");
          }
        },
      });
    }
  } else {
    // Set default values
    const elementsToSet = [
      { selector: ".banner-animation-main-title", props: { opacity: "0" } },
      { selector: ".banner-bar-wrapper", props: { height: "0%" } },
      { selector: ".banner-rotate-content", props: { opacity: "0%" } },
      {
        selector: ".banner-animation-2-bar",
        props: { height: "0%" },
      },
      { selector: ".banner-animation-2-bar-dot", props: { opacity: "0%" } },
      { selector: ".banner-animation-2-bar-2", props: { height: "0%" } },
    ];

    // Apply values set for each element
    elementsToSet.forEach(({ selector, props }) => gsap.set(selector, props));

    // Handle animation items
    const contentItems2 = gsap.utils.toArray(".banner-animation-list .banner-animation-item");
    gsap.set(contentItems2, { x: "-100%", opacity: 0 });

    const contentItems = gsap.utils.toArray(".banner-animation-list-2 .banner-animation-item");
    gsap.set(contentItems, { x: "100%", opacity: 0 });

    document.querySelectorAll(".banner-animation-main-title:not(.banner-animation-main-title-2)").forEach((title) => {
      gsap.to(title, {
        opacity: 1,
        ease: "none",
        scrollTrigger: {
          trigger: title,
          start: "top 80%",
          end: "bottom 80%",
          toggleActions: "play none none reverse",
        },
      });
    });

    gsap.to(".banner-animation-2-bar", {
      height: "100%",
      ease: "none",
      scrollTrigger: {
        trigger: ".banner-animation-2-content",
        start: "top 80%",
        end: "bottom 80%",
        scrub: 1,
        // markers: true
        onUpdate: (self) => {
          if (self.progress == 1) {
            // When the animation reaches 100%
            gsap.to(".banner-animation-2-bar + .banner-animation-main-title-2", {
              opacity: 1,
            });
            gsap.to(".banner-animation-2-bar-dot", { opacity: 1 });
          } else {
            gsap.to(".banner-animation-2-bar + .banner-animation-main-title-2", {
              opacity: 0,
            });
            gsap.to(".banner-animation-2-bar-dot", { opacity: 0 });
          }
        },
      },
    });

    gsap.to(".banner-animation-2-bar-2", {
      height: "100%",
      ease: "none",
      scrollTrigger: {
        trigger: ".banner-animation-2-wrapper-2",
        start: "top 80%",
        end: "bottom 80%",
        scrub: 1,
        // markers: true,
        onUpdate: (self) => {
          if (self.progress == 1) {
            gsap.to(".banner-animation-2-bar-2 + .banner-animation-main-title-2", {
              opacity: 1,
            });
          } else {
            gsap.to(".banner-animation-2-bar-2 + .banner-animation-main-title-2", {
              opacity: 0,
            });
          }
        },
      },
    });

    gsap.to(".banner-animation-1-wrapper .banner-bar-wrapper", {
      height: "100%",
      ease: "none",
      scrollTrigger: {
        trigger: ".banner-animation-1-wrapper",
        start: "top 80%",
        end: "bottom 80%",
        scrub: 1,

        onUpdate: (self) => {
          if (self.progress == 1) {
            gsap.to(".banner-rotate-content", { opacity: 1 });
            document.querySelector(".banner-rotate-content").classList.add("rotate-animation-start");
          } else {
            gsap.to(".banner-rotate-content", { opacity: 0 });
            document.querySelector(".banner-rotate-content").classList.remove("rotate-animation-start");
          }
        },
      },
    });

    contentItems2.forEach((contentItem) => {
      gsap.to(contentItem, {
        x: 0,
        opacity: 1,
        ease: "none",
        scrollTrigger: {
          trigger: contentItem,
          start: "top 80%",
          end: "bottom 80%",
          //   markers: true,
          toggleActions: "play none none reverse",
        },
      });
    });

    contentItems.forEach((contentItem) => {
      gsap.to(contentItem, {
        x: 0,
        opacity: 1,
        ease: "none",
        scrollTrigger: {
          trigger: contentItem,
          start: "top 80%",
          end: "bottom 80%",
          //   markers: true,
          toggleActions: "play none none reverse",
        },
      });
    });
  }
}
// <!-- End banner animation 1------------------------------------------------------------------------>

// <!-- Start banner animation 2------------------------------------------------------------------------>
let themeBanner2 = document.querySelectorAll(".theme-banner-section-2");

if (themeBanner2.length) {
  if (window.innerWidth > 767) {
    if (window.innerHeight > 830) {
      const bannerBorder = document.querySelector(".banner-2-bar-border");

      // Set default values
      const contentItems = gsap.utils.toArray(".theme-banner-section-2 .banner-2-animation-item");
      gsap.set(contentItems, { y: "100%", opacity: 0 });
      gsap.set(bannerBorder, { width: "10%" });

      ScrollTrigger.create({
        trigger: themeBanner2,
        start: "top top",
        end: "bottom top",
        pin: true,
        // markers: true,
      });

      gsap.to(bannerBorder, {
        width: "100%",
        ease: "none",
        scrollTrigger: {
          trigger: themeBanner2,
          start: "top top",
          end: "bottom 20%",
          // markers: true,
          scrub: 1,

          onUpdate: (self) => {
            let progress = self.progress;

            if (progress >= 0.33 && progress < 0.66) {
              gsap.to(contentItems[0], { y: 0, opacity: 1, duration: 1 });
            } else if (progress >= 0.66 && progress < 1) {
              gsap.to(contentItems[1], { y: 0, opacity: 1, duration: 1 });
            } else if (progress >= 1) {
              gsap.to(contentItems[2], { y: 0, opacity: 1, duration: 1 });
            }

            if (progress < 0.33) {
              gsap.to(contentItems[0], {
                y: "100%",
                opacity: 0,
                duration: 1,
              });
            } else if (progress < 0.66) {
              gsap.to(contentItems[1], {
                y: "100%",
                opacity: 0,
                duration: 1,
              });
            } else if (progress < 1) {
              gsap.to(contentItems[2], {
                y: "100%",
                opacity: 0,
                duration: 1,
              });
            }
          },
        },
      });
    }
  } else {
    const bannerBorder = document.querySelector(".banner-2-bar-border");

    // Set default values
    const contentItems = gsap.utils.toArray(".theme-banner-section-2 .banner-2-animation-item");
    gsap.set(contentItems, { x: "-100%", opacity: 0 });
    gsap.set(bannerBorder, { height: "10%" });

    gsap.to(bannerBorder, {
      height: "100%",
      ease: "none",
      scrollTrigger: {
        trigger: ".banner-2-animation-list",
        start: "top 60%",
        end: "bottom 60%",
        scrub: 1,
        // markers: true,
        onUpdate: (self) => {
          let progress = self.progress;

          if (progress >= 0.33 && progress < 0.66) {
            gsap.to(contentItems[0], { x: 0, opacity: 1, duration: 1 });
          } else if (progress >= 0.66 && progress < 1) {
            gsap.to(contentItems[1], { x: 0, opacity: 1, duration: 1 });
          } else if (progress >= 1) {
            gsap.to(contentItems[2], { x: 0, opacity: 1, duration: 1 });
          }

          if (progress < 0.33) {
            gsap.to(contentItems[0], {
              x: "-100%",
              opacity: 0,
              duration: 1,
            });
          } else if (progress < 0.66) {
            gsap.to(contentItems[1], {
              x: "-100%",
              opacity: 0,
              duration: 1,
            });
          } else if (progress < 1) {
            gsap.to(contentItems[2], {
              x: "-100%",
              opacity: 0,
              duration: 1,
            });
          }
        },
      },
    });
  }
}
// <!-- End banner animation 2------------------------------------------------------------------------>

// <!-- Start banner animation 3------------------------------------------------------------------------>
let themeBanner3 = document.querySelectorAll(".theme-banner-section-3");

if (themeBanner3.length) {
  if (window.innerWidth > 767) {
    if (window.innerHeight > 830) {
      // Set default values
      gsap.set(".img-hide-wrapper-1", { width: "100%" });
      gsap.set(".img-hide-wrapper-2", { width: "100%" });

      ScrollTrigger.create({
        trigger: themeBanner3,
        start: "top top",
        end: "bottom top",
        pin: true,
        //   markers: true,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: themeBanner3,
          start: "top top",
          end: "bottom 20%",
          scrub: 1,
          // markers: true,
        },
      });

      tl.to(".img-hide-wrapper-1", { width: "0%", ease: "none" });
      tl.to(".img-hide-wrapper-2", { width: "0%", ease: "none" }, "-=0");
    }
  } else {
    // Set default values
    gsap.set(".img-hide-wrapper", { height: "100%" });

    gsap.utils.toArray(".img-hide-wrapper").forEach((element) => {
      gsap.to(element, {
        height: "0%",
        ease: "none",
        scrollTrigger: {
          trigger: element, // Uses each wrapper as the trigger
          start: "top 60%",
          end: "bottom 60%",
          scrub: 1,
          //   markers: true,
        },
      });
    });
  }
}
// <!-- End banner animation 3------------------------------------------------------------------------>

// <!-- Start tab with responsive accordion------------------------------------------------------------------------>
let currentMode = null;

$(window).on("resize", function () {
  if (window.innerWidth > 767 || window.innerHeight >= 846) {
    location.reload();
  }
});

function setTabAccordion() {
  const isDesktop = window.innerWidth >= 768;
  const newMode = isDesktop ? "desktop" : "mobile";

  if (newMode === currentMode) return;
  currentMode = newMode;

  if (isDesktop) {
    $(".pixel-tabs-body .pixel-tabs-accordion-body").slideDown();

    if (window.innerHeight >= 846) {
      let pixelTabsBlock = document.querySelectorAll(".pixel-tabs-block");

      function activateFirst(selector) {
        pixelTabsBlock.forEach((section) => {
          const elements = section.querySelectorAll(selector);
          elements.forEach((el) => el.classList.remove("active"));
          elements[0]?.classList.add("active");
        });
      }

      activateFirst(".pixel-tabs-head .pixel-tabs-nav-item");
      activateFirst(".pixel-tabs-content-item");
      activateFirst(".pixel-tabs-head .pixel-tabs-description");

      pixelTabsBlock.forEach((section) => {
        const wrapper = section.closest(".pixel-tabs-block-wrapper");
        const navItems = section.querySelectorAll(".pixel-tabs-head .pixel-tabs-nav-item");
        const navImg = section.querySelectorAll(".pixel-tabs-content-item");
        const navDescription = section.querySelectorAll(".pixel-tabs-head .pixel-tabs-description");
        const totalTabs = navImg.length;

        const allSlideScrollTime = 70;
        const lastSlideScrollTime = 120;

        const totalHeightVh = (totalTabs - 1) * allSlideScrollTime + lastSlideScrollTime;
        wrapper.style.height = `${totalHeightVh}vh`;

        const thresholds = [];
        let acc = 0;

        // ScrollTrigger
        const st = ScrollTrigger.create({
          trigger: wrapper,
          // start: window.innerHeight > 860 ? "top 9%" : "top 6%",
          start: "top top",
          end: "bottom bottom",
          pin: section,
          scrub: true,
          //markers: true,

          onUpdate: (self) => {
            const progress = self.progress;
            let index;

            for (let i = 0; i < totalTabs; i++) {
              const vh = i === totalTabs - 1 ? lastSlideScrollTime : allSlideScrollTime;
              acc += vh;
              thresholds.push(acc / totalHeightVh);
            }

            for (let i = 0; i < thresholds.length; i++) {
              if (progress <= thresholds[i]) {
                index = i;
                break;
              }
              // Ensure last index is selected at 100% progress
              if (progress >= 0.999) {
                index = totalTabs - 1;
              }
            }

            navItems.forEach((el, i) => el.classList.toggle("active", i === index));
            navImg.forEach((el, i) => el.classList.toggle("active", i === index));
            navDescription.forEach((el, i) => el.classList.toggle("active", i === index));
          },
        });

        const scrollOffset = 100; // Offset in pixels (adjust as needed)

        navItems.forEach((item, index) => {
          item.addEventListener("click", () => {
            let vhSum = 0;
            for (let i = 0; i <= index; i++) {
              vhSum += i === totalTabs - 1 ? lastSlideScrollTime : allSlideScrollTime;
            }

            const progress = vhSum / totalHeightVh;
            let scrollY = st.start + (st.end - st.start) * progress;

            scrollY -= scrollOffset; // Apply offset (scroll slightly above the section)
            gsap.to(window, {
              scrollTo: scrollY,
              duration: 1,
              ease: "power2.out",
            });
          });
        });
      });
    } else {
      let pixelTabsBlock = document.querySelectorAll(".pixel-tabs-block");

      pixelTabsBlock.forEach((section) => {
        const navItems = section.querySelectorAll(".pixel-tabs-head .pixel-tabs-nav-item");
        const navImg = section.querySelectorAll(".pixel-tabs-content-item");
        const navDescription = section.querySelectorAll(".pixel-tabs-head .pixel-tabs-description");

        navItems.forEach((item, index) => {
          item.addEventListener("click", () => {
            navItems.forEach((el, i) => el.classList.toggle("active", i === index));

            navImg.forEach((el, i) => el.classList.toggle("active", i === index));

            navDescription.forEach((el, i) => el.classList.toggle("active", i === index));
          });
        });
      });
    }
  } else {
    ScrollTrigger.getAll().filter((t) => t.vars.id === "pixel-tabs-section");

    $(".pixel-tabs-body .pixel-tabs-nav-item").removeClass("active");
    $(".pixel-tabs-body .pixel-tabs-accordion-body").slideUp();

    const $firstItem = $(".pixel-tabs-body .pixel-tabs-content-item:first-child");
    $firstItem.find(".pixel-tabs-nav-item").addClass("active");
    $firstItem.find(".pixel-tabs-accordion-body").slideDown();

    $(".pixel-tabs-body .pixel-tabs-nav-item")
      .off("click")
      .on("click", function () {
        const $this = $(this);
        const $accordionBody = $this.siblings(".pixel-tabs-accordion-body");

        if ($this.hasClass("active")) {
          $this.removeClass("active");
          $accordionBody.slideUp();
        } else {
          $(".pixel-tabs-body .pixel-tabs-nav-item").removeClass("active");
          $(".pixel-tabs-body .pixel-tabs-accordion-body").slideUp();
          $this.addClass("active");
          $accordionBody.slideDown();
        }
      });
  }
}

setTabAccordion();
window.addEventListener("resize", setTabAccordion);
// <!-- End tab with responsive accordion------------------------------------------------------------------------>

// <!-- Start scroll animation with responsive accordion------------------------------------------------------------------------>
let currentMode = null;

$(window).on("resize", function () {
  if (window.innerWidth > 767 || window.innerHeight >= 846) {
    location.reload();
  }
});

function setTabAccordion() {
  const isDesktop = window.innerWidth >= 768;
  const newMode = isDesktop ? "desktop" : "mobile";

  if (newMode === currentMode) return;
  currentMode = newMode;

  if (isDesktop) {
    $(".pixel-tabs-body .pixel-tabs-accordion-body").slideDown();

    if (window.innerHeight >= 846) {
      let pixelTabsBlock = document.querySelectorAll(".pixel-tabs-block");

      function activateFirst(selector) {
        pixelTabsBlock.forEach((section) => {
          const elements = section.querySelectorAll(selector);
          elements.forEach((el) => el.classList.remove("active"));
          elements[0]?.classList.add("active");
        });
      }

      activateFirst(".pixel-tabs-head .pixel-tabs-nav-item");
      activateFirst(".pixel-tabs-content-item");
      activateFirst(".pixel-tabs-head .pixel-tabs-description");

      pixelTabsBlock.forEach((section) => {
        const wrapper = section.closest(".pixel-tabs-block-wrapper");
        const navItems = section.querySelectorAll(".pixel-tabs-head .pixel-tabs-nav-item");
        const navImg = section.querySelectorAll(".pixel-tabs-content-item");
        const navDescription = section.querySelectorAll(".pixel-tabs-head .pixel-tabs-description");
        const totalTabs = navImg.length;

        const allSlideScrollTime = 70;
        const lastSlideScrollTime = 120;

        const totalHeightVh = (totalTabs - 1) * allSlideScrollTime + lastSlideScrollTime;
        wrapper.style.height = `${totalHeightVh}vh`;

        const thresholds = [];
        let acc = 0;

        // ScrollTrigger
        const st = ScrollTrigger.create({
          trigger: wrapper,
          start: window.innerHeight > 860 ? "top 9%" : "top 6%",
          end: "bottom bottom",
          pin: section,
          scrub: true,
          //   markers: true,

          onUpdate: (self) => {
            const progress = self.progress;
            let index;

            for (let i = 0; i < totalTabs; i++) {
              const vh = i === totalTabs - 1 ? lastSlideScrollTime : allSlideScrollTime;
              acc += vh;
              thresholds.push(acc / totalHeightVh);
            }

            for (let i = 0; i < thresholds.length; i++) {
              if (progress <= thresholds[i]) {
                index = i;
                break;
              }
              // Ensure last index is selected at 100% progress
              if (progress >= 0.999) {
                index = totalTabs - 1;
              }
            }

            navItems.forEach((el, i) => el.classList.toggle("active", i === index));
            navImg.forEach((el, i) => el.classList.toggle("active", i === index));
            navDescription.forEach((el, i) => el.classList.toggle("active", i === index));
          },
        });

        navItems.forEach((item, index) => {
          item.addEventListener("click", () => {
            let vhSum = 0;
            for (let i = 0; i <= index; i++) {
              vhSum += i === totalTabs - 1 ? lastSlideScrollTime : allSlideScrollTime;
            }

            const progress = vhSum / totalHeightVh;
            const scrollY = st.start + (st.end - st.start) * progress;

            gsap.to(window, {
              scrollTo: scrollY,
              duration: 1,
              ease: "power2.out",
            });
          });
        });
      });
    } else {
      let pixelTabsBlock = document.querySelectorAll(".pixel-tabs-block");

      pixelTabsBlock.forEach((section) => {
        const navItems = section.querySelectorAll(".pixel-tabs-head .pixel-tabs-nav-item");
        const navImg = section.querySelectorAll(".pixel-tabs-content-item");
        const navDescription = section.querySelectorAll(".pixel-tabs-head .pixel-tabs-description");

        navItems.forEach((item, index) => {
          item.addEventListener("click", () => {
            navItems.forEach((el, i) => el.classList.toggle("active", i === index));

            navImg.forEach((el, i) => el.classList.toggle("active", i === index));

            navDescription.forEach((el, i) => el.classList.toggle("active", i === index));
          });
        });
      });
    }
  } else {
    ScrollTrigger.getAll().forEach((t) => t.kill());

    $(".pixel-tabs-body .pixel-tabs-nav-item").removeClass("active");
    $(".pixel-tabs-body .pixel-tabs-accordion-body").slideUp();

    const $firstItem = $(".pixel-tabs-body .pixel-tabs-content-item:first-child");
    $firstItem.find(".pixel-tabs-nav-item").addClass("active");
    $firstItem.find(".pixel-tabs-accordion-body").slideDown();

    $(".pixel-tabs-body .pixel-tabs-nav-item")
      .off("click")
      .on("click", function () {
        const $this = $(this);
        const $accordionBody = $this.siblings(".pixel-tabs-accordion-body");

        if ($this.hasClass("active")) {
          $this.removeClass("active");
          $accordionBody.slideUp();
        } else {
          $(".pixel-tabs-body .pixel-tabs-nav-item").removeClass("active");
          $(".pixel-tabs-body .pixel-tabs-accordion-body").slideUp();
          $this.addClass("active");
          $accordionBody.slideDown();
        }
      });
  }
}

setTabAccordion();
window.addEventListener("resize", setTabAccordion);
// <!-- End scroll animation with responsive accordion------------------------------------------------------------------------>

// <!-- Start scroll animation with slide------------------------------------------------------------------------>
let simpleTextSliderSection = document.querySelectorAll(".simple-text-slider-section");

simpleTextSliderSection.forEach((section) => {
  const elements = section.querySelectorAll(".simple-text-slide");
  elements.forEach((el) => el.classList.remove("active"));
  elements[0]?.classList.add("active");
});

simpleTextSliderSection.forEach((section) => {
  const wrapper = section.querySelector(".simple-text-slider-section-wrapper");
  const simpleTextSlide = section.querySelectorAll(".simple-text-slide");
  const simpleTextSlideList = section.querySelector(".simple-text-slide-list");
  const totalTabs = simpleTextSlide.length;

  const allSlideScrollTime = 70;
  const lastSlideScrollTime = 120;

  const simpleTextSliderDotsWrapper = section.querySelector(".simple-text-slider-dots-wrapper");

  const totalHeightVh = (totalTabs - 1) * allSlideScrollTime + lastSlideScrollTime;
  section.style.height = `${totalHeightVh}vh`;

  const thresholds = [];
  let acc = 0;

  simpleTextSliderDotsWrapper.innerHTML = "";

  // Create dot elements
  simpleTextSlide.forEach((el, index) => {
    const dot = document.createElement("div");
    dot.classList.add("simple-text-slider-dot");
    if (index === 0) dot.classList.add("active");

    simpleTextSliderDotsWrapper.appendChild(dot);
  });

  // Create ScrollTrigger
  const st = ScrollTrigger.create({
    trigger: section,
    start: "top top",
    end: "bottom bottom",
    scrub: 1,
    pin: wrapper,
    // markers: true,

    onUpdate: (self) => {
      const progress = self.progress;
      let index = 0;

      for (let i = 0; i < totalTabs; i++) {
        const vh = i === totalTabs - 1 ? lastSlideScrollTime : allSlideScrollTime;
        acc += vh;
        thresholds.push(acc / totalHeightVh);
      }

      for (let i = 0; i < thresholds.length; i++) {
        if (progress <= thresholds[i]) {
          index = i;
          break;
        }
        // Ensure last index is selected at 100% progress
        if (progress >= 0.999) {
          index = totalTabs - 1;
        }
      }

      const count = index * -100;
      simpleTextSlideList.style.transform = `translateX(${count}%)`;

      // Update dots
      const dots = section.querySelectorAll(".simple-text-slider-dot");
      dots.forEach((dot, i) => {
        dot.classList.toggle("active", i === index);
      });
    },
  });

  // Handle dot click to scroll
  const dots = section.querySelectorAll(".simple-text-slider-dot");
  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      let vhSum = 0;
      for (let i = 0; i <= index; i++) {
        vhSum += i === totalTabs - 1 ? lastSlideScrollTime : allSlideScrollTime;
      }

      const progress = vhSum / totalHeightVh;
      const scrollY = st.start + (st.end - st.start) * progress;

      gsap.to(window, {
        scrollTo: scrollY,
        duration: 1,
        ease: "power2.out",
      });
    });
  });
});
// <!-- End scroll animation with slide------------------------------------------------------------------------>

// Start First animation Scroll + click based-------------------------------------------------------------------------------------------------------------------------------------------------------------
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
  onLeave: () => {
    processImgSection.classList.remove("active");
    gsap.to(processImgSection, { opacity: 0, duration: 0.5 });
  },
  onEnterBack: () => {
    processImgSection.classList.add("active");
    gsap.to(processImgSection, { opacity: 1, duration: 0.5 });
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

// Start process img slider section opacity 0 to 1-----------------------------------------
tl.to(processImgSection, {
  opacity: 1,
  duration: 5,
  onUpdate: function () {
    if (this.progress() > 0.1) {
      if (!processImgSection.classList.contains("active")) {
        processImgSection.classList.add("active");
      }
    } else {
      if (processImgSection.classList.contains("active")) {
        processImgSection.classList.remove("active");
      }
    }
  },
});
// End process img slider section opacity 0 to 1-----------------------------------------

tl.addLabel("imgSectionFadeInStart");

// Start img slider section: main title move bottom to top-----------------------------------------
tl.to(processSection.querySelector(".process-slider-main-title"), {
  delay: 2,
  // y: "-100%",
  opacity: 0,
  duration: 1.5,
  onUpdate: function () {
    if (this.progress() > 0) {
      processSliderMainImgs[0].classList.add("show-shadow");
    } else {
      gsap.to(processSliderTitles[0], {
        //   top: "100%",.
        opacity: 0,
        duration: 1.5,
      });
      processSliderMainImgs[0].classList.remove("show-shadow");
    }
  },
});
// End img slider section: main title move bottom to top-----------------------------------------

// Start img slider section: 1st slide title move bottom to top-----------------------------------------
if (processSliderTitles[0]) {
  tl.to(
    processSliderTitles[0],
    {
      // top: "0%",
      opacity: 1,
      duration: 1.5,
    },
    "<"
  );
}
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

// Start img slider section: arrows opacity 0 to 1-----------------------------------------
tl.fromTo(
  processImgSection.querySelector(".process-slider-arrows"),
  {
    opacity: 0,
    pointerEvents: "none",
  },
  {
    opacity: 1,
    duration: 1.5,
    onComplete: function () {
      processImgSection.querySelector(".process-slider-arrows").style.pointerEvents = "auto";
    },
  },
  "<"
);
// End img slider section: arrows opacity 0 to 1-----------------------------------------

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
      gsap.to([processSliderTitles[currentSliderIndex], processSliderDescriptions[currentSliderIndex], processSliderGridContents[currentSliderIndex]], {
        opacity: 0,
        zIndex: 0,
        duration: 1,
      });

      gsap.to([processSliderTitles[stepIndex], processSliderDescriptions[stepIndex], processSliderGridContents[stepIndex]], {
        opacity: 1,
        zIndex: 1,
        duration: 1,
      });

      processSliderMainImgs.forEach((img) => img.classList.remove("active", "show-shadow"));
      setTimeout(() => processSliderMainImgs[stepIndex].classList.add("show-shadow"), 500);
      processSliderMainImgs[stepIndex].classList.add("active");

      processImgSection.style.setProperty("--processSliderImgWrapperWidth", processSliderImgWrapper.offsetWidth + "px");
      processSliderMainImgWrapper.style.width = `var(--processSliderImgWrapperWidth-${stepIndex})`;
      currentSliderIndex = stepIndex;
    }
  },
});
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

// Start tab to slider click animation--------------------------------------------------------------------------------
processTabBtn.addEventListener("click", () => {
  processSliderBtn.style.pointerEvents = "none";

  const scrollToPos = tl.scrollTrigger.labelToScroll("imgSectionFadeInStart");

  gsap.to(window, {
    scrollTo: scrollToPos,
    onComplete: () => {
      gsap.to(processImgSection, {
        opacity: 0,
        duration: 0,
        onComplete: () => {
          processImgSection.classList.remove("active");
          processSliderBtn.style.pointerEvents = "auto";
          processTabImgContent[processTabImgContent.length - 1].style.position = "relative";
          processTabImgContent[processTabImgContent.length - 1].style.zIndex = 1;
        },
      });
    },
  });
});
// End tab to slider click animation--------------------------------------------------------------------------------

// Start slider dots click animation--------------------------------------------------------------------------------
const dotScrollStart = tl.scrollTrigger.labelToScroll("dotStart");
const dotScrollEnd = tl.scrollTrigger.end;
const nextArrow = document.querySelector(".slider-next-arrow");
const prevArrow = document.querySelector(".slider-prev-arrow");

function navigateToSlider(index) {
  const totalSlides = processSliderMainImgs.length;

  if (index >= totalSlides) {
    index = 0;
  } else if (index < 0) {
    index = totalSlides - 1;
  }

  const progress = index / (totalSlides - 1);
  const scrollToPos = dotScrollStart + (dotScrollEnd - dotScrollStart) * progress;

  gsap.to(window, {
    scrollTo: scrollToPos,
    duration: 1,
    onComplete: () => {
      currentSliderIndex = index;

      gsap.to(sliderStepSync, {
        step: index,
        duration: 0.5,
      });
    },
  });
}

nextArrow.addEventListener("click", () => {
  navigateToSlider(currentSliderIndex + 1);
});

prevArrow.addEventListener("click", () => {
  navigateToSlider(currentSliderIndex - 1);
});
// End slider dots click animation--------------------------------------------------------------------------------

// Start slider back to tab click animation--------------------------------------------------------------------------------
processSliderBtn.addEventListener("click", () => {
  processTabBtn.style.pointerEvents = "none";

  const totalTabs = processTabImgContent.length;
  const lastIndex = totalTabs - 1;

  const progress = lastIndex / (totalTabs - 1);
  const scrollToPos = scrollStart + (scrollEnd - scrollStart) * progress;

  gsap.to(window, {
    scrollTo: scrollToPos,
    onComplete: () => {
      gsap.to(processImgSection, {
        opacity: 0,
        duration: 0,
        onComplete: () => {
          processTabBtn.style.pointerEvents = "auto";
        },
      });
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

// Start Second animation half Scroll + tab & slider click without scroll based-------------------------------------------------------------------------------------------------------------------------------------------------------------
// Start page on load--------------------------------------------------------------------------------
window.addEventListener("load", () => {
  if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
  }
  window.scrollTo(0, 0);
});

let prevWidth = window.innerWidth;
let prevHeight = window.innerHeight;
let resizeTimeout;

$(window).on("resize", function () {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(function () {
    const currentWidth = window.innerWidth;
    const currentHeight = window.innerHeight;

    const widthChanged = Math.abs(currentWidth - prevWidth) > 10;
    const heightChanged = Math.abs(currentHeight - prevHeight) > 100;

    // Only reload on significant changes
    if ((widthChanged && currentWidth > 767 && currentHeight > 830) || widthChanged) {
      location.reload();
    }

    prevWidth = currentWidth;
    prevHeight = currentHeight;
  }, 200);
});
// End page on load--------------------------------------------------------------------------------

let processSection = document.querySelector(".process-section");
let processSectionWrapper = processSection.querySelector(".process-section-wrapper");
let processWrapper = processSection.querySelector(".process-wrapper");

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
const processTabContent = processSection.querySelector(".process-tab-content");
const processSliderContent = processSection.querySelector(".process-slider-content");

const processTabContentList = processSection.querySelector(".process-tab-content-list");
let allProcessTabWidth = 0;
processTabContentList.querySelectorAll(".process-tab").forEach((item) => {
  allProcessTabWidth += item.offsetWidth;
});
let processTabContentListGap = (processTabContentList.offsetWidth - allProcessTabWidth) / 3;
// End process-tab-content-list gap--------------------------------------------------------------------------------

// Start process-tab-bar-animation width--------------------------------------------------------------------------------
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
    id: "processScroll",
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
    processSection.querySelectorAll(".hero-title-letters").forEach((letter) => {
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
      if (window.innerWidth > 991) {
        if (this.progress() === 1) {
          processTabImgContentWrapper.style.pointerEvents = "auto";

          gsap.to([processImgLayer, processTabBarAnimation], {
            opacity: 1,
            duration: 1,
          });

          processTabContent.classList.add("active");
          processTabs[0].classList.add("active");

          startAutoPlayTab();
        } else {
          if (processTabContent.classList.contains("active") || processSliderContent.classList.contains("active")) {
            processTabImgContent[0].click();
          }

          processTabImgContentWrapper.style.pointerEvents = "none";

          gsap.to([processImgLayer, processTabBarAnimation], {
            opacity: 0,
            duration: 1,
          });

          processTabContent.classList.remove("active");
          processTabs[0].classList.remove("active");

          clearInterval(autoPlayIntervalTab);
        }
      } else {
        if (this.progress() === 1) {
          gsap.to(processTabImgWrapper, {
            width: window.innerWidth <= 479 ? "265%" : window.innerWidth <= 767 ? "150%" : "120%",
            duration: 1.5,
            onUpdate: function () {
              if (this.progress() === 1) {
                let processTabImgContentWidth = processTabImgContent[0].offsetWidth + "px";
                processImgLayerWhite.style.width = processTabImgContentWidth;
                processImgLayer.style.transform = `translateX(${processTabImgContentWidth})`;
                // Start for responsive <= 991-----------
                processTabImgContentWrapper.style.transform = `translateX(${processTabImgContentWidth - processTabImgContentWidth})`;
                // End for responsive <= 991-----------

                processTabImgContentWrapper.style.pointerEvents = "auto";

                gsap.to([processImgLayer, processTabBarAnimation], {
                  opacity: 1,
                  duration: 1,
                });

                processTabContent.classList.add("active");
                processTabs[0].classList.add("active");

                processWrapper.addEventListener("touchstart", handleTouchStart);
                processWrapper.addEventListener("touchend", handleTouchEnd);

                resetAutoPlayTabAfterClick();
                startAutoPlayTab();
              }
            },
          });
        } else {
          gsap.to(processTabImgWrapper, {
            onUpdate: function () {
              if (this.progress() < 1 && this.progress() > 0) {
                if (processTabContent.classList.contains("active") || processSliderContent.classList.contains("active")) {
                  processTabImgContent[0].click();
                }

                processTabImgContentWrapper.style.pointerEvents = "none";

                gsap.to([processImgLayer, processTabBarAnimation], {
                  opacity: 0,
                  duration: 1,
                });

                processTabContent.classList.remove("active");
                processTabs[0].classList.remove("active");

                processWrapper.removeEventListener("touchstart", handleTouchStart);
                processWrapper.removeEventListener("touchend", handleTouchEnd);

                clearInterval(autoPlayIntervalTab);
              } else if (this.progress() === 0) {
                gsap.to(processTabImgWrapper, {
                  width: "100%",
                });
              }
            },
          });
        }
      }
    },

    onComplete: function () {
      gsap.to(window, {
        scrollTo: window.scrollY + 30,
        duration: 1,
        ease: "power2.out",
      });
    },
  },
  "<"
);
// End images & bottom content opacity 0 to 1-----------------------------------------

// // Start images parent div set width-----------------------------------------
// if (window.innerWidth < 992) {
//   tl.to(processTabImgWrapper, {
//     width: window.innerWidth <= 479 ? "265%" : window.innerWidth <= 767 ? "150%" : "120%",
//     duration: 1.5,
//     onComplete: () => {
//       let processTabImgContentWidth = processTabImgContent[0].offsetWidth + "px";
//       processImgLayerWhite.style.width = processTabImgContentWidth;
//       processImgLayer.style.transform = `translateX(${processTabImgContentWidth})`;
//       // Start for responsive <= 991-----------
//       processTabImgContentWrapper.style.transform = `translateX(${processTabImgContentWidth - processTabImgContentWidth})`;
//       // End for responsive <= 991-----------
//     },
//     onUpdate: function () {
//       if (this.progress() === 1) {
//         processTabImgContentWrapper.style.pointerEvents = "auto";

//         gsap.to([processImgLayer, processTabBarAnimation], {
//           opacity: 1,
//           duration: 1,
//         });

//         processTabContent.classList.add("active");
//         processTabs[0].classList.add("active");

//         processWrapper.addEventListener("touchstart", handleTouchStart);
//         processWrapper.addEventListener("touchend", handleTouchEnd);

//         resetAutoPlayTabAfterClick();
//         startAutoPlayTab();
//       } else {
//         if (processTabContent.classList.contains("active") || processSliderContent.classList.contains("active")) {
//           processTabImgContent[0].click();
//         }

//         processTabImgContentWrapper.style.pointerEvents = "none";

//         gsap.to([processImgLayer, processTabBarAnimation], {
//           opacity: 0,
//           duration: 1,
//         });

//         processTabContent.classList.remove("active");
//         processTabs[0].classList.remove("active");

//         processWrapper.removeEventListener("touchstart", handleTouchStart);
//         processWrapper.removeEventListener("touchend", handleTouchEnd);

//         clearInterval(autoPlayIntervalTab);
//       }
//     },
//   });
// }
// // End images parent div set width-----------------------------------------

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
    processSection.querySelector(".process-img-layer-gray-right").style.opacity = 1;
    processTabImgContent[processTabs.length - 1].style.position = "static";
    processTabImgContent[processTabs.length - 1].style.zIndex = "0";
  } else {
    processTabBarAnimation.style.width = "100%";
    processTabBarAnimation2.style.width = "100%";
    processTabContent.classList.remove("active");
    processSliderContent.classList.add("active");
    setTimeout(() => {
      processSection.querySelector(".process-img-layer-gray-right").style.opacity = 0;
      processTabImgContent[processTabs.length - 1].style.position = "relative";
      processTabImgContent[processTabs.length - 1].style.zIndex = "1";
    }, 500);
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
  document.documentElement.classList.add("overflow-hidden");
  processImgSection.classList.add("active");
  e.target.classList.add("active");
  processImgSection.querySelector(".process-tab-slider-wrapper").style.pointerEvents = "none";

  setTimeout(() => {
    processSliderMainImgs[0].classList.add("active", "show-shadow");
    processImgSection.querySelector(".process-tab-slider-wrapper").style.pointerEvents = "auto";

    // gsap.to(processImgSection.querySelector(".process-slider-main-title"), {
    //   y: "-100%",
    //   duration: 1,
    // });

    gsap.to(processImgSection.querySelector(".process-slider-main-title"), {
      opacity: 0,
      duration: 1,
    });

    // gsap.to(processSliderTitles[0], {
    //   top: "100%",
    //   duration: 1,
    // });

    gsap.to([processSliderTitles[0], processImgSection.querySelector(".process-slider-sub-title"), processSection.querySelector(".process-slider-description-wrapper"), processSliderGridWrapper], {
      opacity: 1,
      duration: 1,
    });

    pauseAutoPlayTab();
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

  // const isForward = index > currentSliderActiveIndex;

  // gsap.to(processSliderTitles[currentSliderActiveIndex], {
  //   top: isForward ? "-100%" : "100%",
  //   duration: 1,
  //   ease: "power2.inOut",
  // });

  // gsap.set(processSliderTitles[index], {
  //   top: isForward ? "100%" : "-100%",
  // });

  // gsap.to(processSliderTitles[index], {
  //   top: "0%",
  //   duration: 1,
  //   ease: "power2.inOut",
  // });

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
  // processSliderDescriptions.forEach((el) => gsap.to(el, { zIndex: 0, opacity: 0 }));
  // processSliderGridContents.forEach((el) => gsap.to(el, { zIndex: 0, opacity: 0 }));
  // gsap.to([processSliderDescriptions[index], processSliderGridContents[index]], { zIndex: 1, opacity: 1, duration: 1 });

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

    resumeAutoPlayTab();
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

window.addEventListener("load", () => {
  setContentOutOfContainer();
});
window.addEventListener("resize", setContentOutOfContainer);
// End set gray layer width & position--------------------------------------------------------------------------------
// End Second animation half Scroll + tab & slider click without scroll based-------------------------------------------------------------------------------------------------------------------------------------------------------------

// <!-- Start banner animation 4------------------------------------------------------------------------>
let themeBanners4 = document.querySelectorAll(".theme-banner-section-4");

if (themeBanners4.length) {
  themeBanners4.forEach((themeBanner4) => {
    let themeBannerWrapper = themeBanner4.querySelector(".theme-banner-wrapper");
    let bannerAnimationListV2 = themeBanner4.querySelectorAll(".banner-animation-list-v2");
    let bannerAnimation2Bar = themeBanner4.querySelector(".banner-animation-2-bar");
    let bannerAnimationMainTitle2V2 = themeBanner4.querySelector(".banner-animation-main-title-2-v2");
    let bannerAnimation2BarLine = themeBanner4.querySelector(".banner-animation-2-bar-line");
    let bannerAnimation2Bar2 = themeBanner4.querySelector(".banner-animation-2-bar-2");
    let bannerAnimationMainTitle3V2 = themeBanner4.querySelector(".banner-animation-main-title-3-v2");
    let bannerAnimationMainTitleV2 = themeBanner4.querySelector(".banner-animation-3 .banner-animation-main-title-v2");
    let bannerAnimationItemV2 = themeBanner4.querySelectorAll(".banner-animation-3 .banner-animation-item-v2");

    if (window.innerWidth > 767) {
      if (window.innerHeight > 830) {
        const elementsToSet = [
          { selector: themeBanner4.querySelectorAll(".banner-animation-list-v2:not(:first-child)"), props: { opacity: 0.3 } },
          { selector: [bannerAnimation2Bar, bannerAnimation2Bar2], props: { width: "0%" } },
          { selector: [bannerAnimationMainTitle2V2, bannerAnimation2BarLine, bannerAnimationMainTitle3V2, bannerAnimationMainTitleV2], props: { opacity: 0 } },
          { selector: bannerAnimationItemV2, props: { y: "100%", opacity: 0 } },
        ];

        // Apply values set for each element
        elementsToSet.forEach(({ selector, props }) => gsap.set(selector, props));

        ScrollTrigger.create({
          trigger: themeBanner4,
          start: "top top",
          end: "bottom bottom",
          pin: themeBannerWrapper,
          //   markers: true,
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: themeBanner4,
            start: "top top",
            end: "bottom 120%",
            scrub: 1,
            // markers: true,
          },
        });

        tl.to(bannerAnimation2Bar, {
          width: "100%",
          ease: "none",

          onUpdate: function () {
            let progress = this.progress();

            if (progress === 1) {
              gsap.to([bannerAnimationMainTitle2V2, bannerAnimationMainTitleV2, bannerAnimation2BarLine], { opacity: 1 });
              gsap.to(bannerAnimationItemV2[0], { y: 0, opacity: 1 });
            } else {
              gsap.to([bannerAnimationMainTitle2V2, bannerAnimationMainTitleV2, bannerAnimation2BarLine], { opacity: 0 });
              gsap.to(bannerAnimationItemV2[0], { y: "100%", opacity: 0 });
            }
          },
        });

        tl.to(bannerAnimation2Bar2, {
          width: "100%",
          ease: "none",

          onUpdate: function () {
            let progress = this.progress();

            if (progress == 1) {
              gsap.to(bannerAnimationMainTitle3V2, { opacity: 1 });
            } else {
              gsap.to(bannerAnimationMainTitle3V2, { opacity: 0 });
            }

            if (progress >= 0.5 && progress < 0.9) {
              gsap.to(bannerAnimationListV2[1], { opacity: 1 });
              gsap.to(bannerAnimationItemV2[1], { y: 0, opacity: 1 });
            } else if (progress >= 0.9) {
              gsap.to(bannerAnimationListV2[2], { opacity: 1 });
              gsap.to(bannerAnimationItemV2[2], { y: 0, opacity: 1 });
            }

            if (progress < 0.5) {
              gsap.to(bannerAnimationListV2[1], { opacity: 0.3 });
              gsap.to(bannerAnimationItemV2[1], { y: "100%", opacity: 0 });
            } else if (progress < 0.9) {
              gsap.to(bannerAnimationListV2[2], { opacity: 0.3 });
              gsap.to(bannerAnimationItemV2[2], { y: "100%", opacity: 0 });
            }
          },
        });
      }
    } else {
      const elementsToSet = [
        { selector: bannerAnimationListV2, props: { x: "-100%", opacity: 0 } },
        { selector: bannerAnimationItemV2, props: { x: "100%", opacity: 0 } },
        { selector: [themeBanner4.querySelectorAll(".banner-animation-main-title:not(.banner-animation-main-title-2)"), bannerAnimationMainTitle2V2, bannerAnimationMainTitle3V2, bannerAnimation2BarLine], props: { opacity: 0 } },
        { selector: [bannerAnimation2Bar, bannerAnimation2Bar2], props: { height: 0 } },
      ];

      // Apply values set for each element
      elementsToSet.forEach(({ selector, props }) => gsap.set(selector, props));

      gsap.to(themeBanner4.querySelectorAll(".banner-animation-main-title:not(.banner-animation-main-title-2)"), {
        opacity: 1,
        ease: "none",
        scrollTrigger: {
          trigger: themeBanner4.querySelectorAll(".banner-animation-main-title:not(.banner-animation-main-title-2)"),
          start: "top 80%",
          end: "bottom 80%",
          //   markers: true,
          toggleActions: "play none none reverse",
        },
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: themeBanner4.querySelector(".banner-animation-2-wrapper-v2"),
          start: "top 85%",
          end: "bottom 85%",
          scrub: 1,
          //   markers: true,
        },
      });

      tl.to(bannerAnimation2Bar, {
        height: "100%",
        ease: "none",

        onUpdate: function () {
          let progress = this.progress();

          if (progress == 1) {
            gsap.to(bannerAnimation2BarLine, { opacity: 1 });
          } else {
            gsap.to(bannerAnimation2BarLine, { opacity: 0 });
          }

          if (this.progress() >= 0.7) {
            gsap.to(bannerAnimationMainTitle2V2, { opacity: 1 });
            gsap.to([bannerAnimationListV2[0], bannerAnimationItemV2[0]], { x: 0, opacity: 1 });
          } else {
            gsap.to(bannerAnimationMainTitle2V2, { opacity: 0 });
            gsap.to(bannerAnimationListV2[0], { x: "-100%", opacity: 0 });
            gsap.to(bannerAnimationItemV2[0], { x: "100%", opacity: 0 });
          }
        },
      });

      tl.to(bannerAnimation2Bar2, {
        height: "100%",
        ease: "none",

        onUpdate: function () {
          let progress = this.progress();

          if (progress == 1) {
            gsap.to(bannerAnimationMainTitle3V2, { opacity: 1 });
          } else {
            gsap.to(bannerAnimationMainTitle3V2, { opacity: 0 });
          }

          if (progress >= 0.4 && progress < 0.9) {
            gsap.to([bannerAnimationListV2[1], bannerAnimationItemV2[1]], { x: 0, opacity: 1 });
          } else if (progress >= 0.9) {
            gsap.to([bannerAnimationListV2[2], bannerAnimationItemV2[2]], { x: 0, opacity: 1 });
          }

          if (progress < 0.4) {
            gsap.to(bannerAnimationListV2[1], { x: "-100%", opacity: 0 });
            gsap.to(bannerAnimationItemV2[1], { x: "100%", opacity: 0 });
          } else if (progress < 0.9) {
            gsap.to(bannerAnimationListV2[2], { x: "-100%", opacity: 0 });
            gsap.to(bannerAnimationItemV2[2], { x: "100%", opacity: 0 });
          }
        },
      });
    }
  });
}
// <!-- End banner animation 4------------------------------------------------------------------------>
