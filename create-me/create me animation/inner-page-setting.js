// <!-- Start header height------------------------------------------------------------------------------------------>
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
// <!-- End header height------------------------------------------------------------------------------------------>

// <!-- Start Icon Content New Page Animation------------------------------------------------------------------------>
let animationScrollSections = document.querySelectorAll(
  ".animation-scroll-section"
);

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
        let contentLength = Array.from(
          animationScrollSection.querySelectorAll(".hero-section")
        ).length;

        animationScrollSection.style.minHeight =
          100 * contentLength + 100 + "vh";
      });

      const animationScrollItem = gsap.utils.toArray(
        ".animation-scroll-section .hero-section"
      );

      // Set default values = Index 0
      gsap.set(".bar-wrapper-1", { width: "0%" });
      gsap.set(".animation-dot-wrapper", { left: "0%" });

      // Set default values = Index 1
      gsap.set(".animation-content-wrapper-2", {
        transform: "translateY(100%)",
        opacity: 0,
      });
      const contentItems = gsap.utils.toArray(
        ".animation-content-wrapper-2 .content-item"
      );
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
    const animationScrollItem = gsap.utils.toArray(
      ".animation-scroll-section .hero-section"
    );

    // Set default values = Index 0
    gsap.set(".bar-wrapper-1", { height: "0%" });
    gsap.set(".animation-dot-wrapper", { top: "0%" });

    // Set default values = Index 1
    const contentItems = gsap.utils.toArray(
      ".animation-content-wrapper-2 .content-item"
    );
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
          selector:
            ".banner-animation-2-wrapper-2 .banner-animation-main-title-2",
          props: { opacity: 0 },
        },
        { selector: ".banner-bar-wrapper", props: { width: "0%" } },
        { selector: ".banner-rotate-content", props: { opacity: 0 } },
      ];

      // Apply values set for each element
      elementsToSet.forEach(({ selector, props }) => gsap.set(selector, props));

      // Handle animation items
      const contentItems = gsap.utils.toArray(
        ".banner-animation-list-2 .banner-animation-item"
      );
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
            gsap.to(
              ".banner-animation-2-bar + .banner-animation-main-title-2",
              { opacity: 1 }
            );
            gsap.to(".banner-animation-3 .banner-animation-main-title", {
              opacity: 1,
            });
            gsap.to(contentItems[0], { y: 0, opacity: 1 });
          } else {
            gsap.to(".banner-animation-2-bar-dot", { opacity: 0 });
            gsap.to(
              ".banner-animation-2-bar + .banner-animation-main-title-2",
              { opacity: 0 }
            );
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
            gsap.to(
              ".banner-animation-2-wrapper-2 .banner-animation-main-title-2",
              { opacity: 1 }
            );
          } else {
            gsap.to(
              ".banner-animation-2-wrapper-2 .banner-animation-main-title-2",
              { opacity: 0 }
            );
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
            document
              .querySelector(".banner-rotate-content")
              .classList.add("rotate-animation-start");
          } else {
            document
              .querySelector(".banner-rotate-content")
              .classList.remove("rotate-animation-start");
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
    const contentItems2 = gsap.utils.toArray(
      ".banner-animation-list .banner-animation-item"
    );
    gsap.set(contentItems2, { x: "-100%", opacity: 0 });

    const contentItems = gsap.utils.toArray(
      ".banner-animation-list-2 .banner-animation-item"
    );
    gsap.set(contentItems, { x: "100%", opacity: 0 });

    document
      .querySelectorAll(
        ".banner-animation-main-title:not(.banner-animation-main-title-2)"
      )
      .forEach((title) => {
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
            gsap.to(
              ".banner-animation-2-bar + .banner-animation-main-title-2",
              {
                opacity: 1,
              }
            );
            gsap.to(".banner-animation-2-bar-dot", { opacity: 1 });
          } else {
            gsap.to(
              ".banner-animation-2-bar + .banner-animation-main-title-2",
              {
                opacity: 0,
              }
            );
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
            gsap.to(
              ".banner-animation-2-bar-2 + .banner-animation-main-title-2",
              {
                opacity: 1,
              }
            );
          } else {
            gsap.to(
              ".banner-animation-2-bar-2 + .banner-animation-main-title-2",
              {
                opacity: 0,
              }
            );
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
            document
              .querySelector(".banner-rotate-content")
              .classList.add("rotate-animation-start");
          } else {
            gsap.to(".banner-rotate-content", { opacity: 0 });
            document
              .querySelector(".banner-rotate-content")
              .classList.remove("rotate-animation-start");
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
      const contentItems = gsap.utils.toArray(
        ".theme-banner-section-2 .banner-2-animation-item"
      );
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
    const contentItems = gsap.utils.toArray(
      ".theme-banner-section-2 .banner-2-animation-item"
    );
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
if (window.innerWidth >= 768) {
  let pixelTabsBodys = document.querySelectorAll(".pixel-tabs-body > *");
  let pixelTabsDescriptions = document.querySelectorAll(
    ".pixel-tabs-description > *"
  );
  let pixelTabsNavs = document.querySelectorAll(".pixel-tabs-nav > *");

  pixelTabsNavs.forEach((pixelTabsNav, index) => {
    pixelTabsNav.addEventListener("click", (e) => {
      // if (!e.target.classList.contains("active")) {
      pixelTabsNavs.forEach((pixelTabsNav) => {
        pixelTabsNav.classList.remove("active");
      });
      pixelTabsBodys.forEach((pixelTabsBodys) => {
        pixelTabsBodys.style.display = "none";
      });
      pixelTabsDescriptions.forEach((pixelTabsDescription) => {
        pixelTabsDescription.style.display = "none";
      });

      e.target.classList.add("active");
      pixelTabsBodys[index].style.display = "block";
      pixelTabsDescriptions[index].style.display = "block";
      // }
    });
  });
} else {
  $(".pixel-tabs-nav-item.active")
    .siblings(".pixel-tabs-accordion-body")
    .slideDown();
  $(".pixel-tabs-nav-item").click(function () {
    if ($(this).hasClass("active")) {
      $(this).removeClass("active");
      $(this).siblings(".pixel-tabs-accordion-body").slideUp();
    } else {
      $(".pixel-tabs-nav-item").removeClass("active");
      $(".pixel-tabs-accordion-body").slideUp();
      $(this).addClass("active");
      $(this).siblings(".pixel-tabs-accordion-body").slideDown();
    }
  });
}
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
        const navItems = section.querySelectorAll(
          ".pixel-tabs-head .pixel-tabs-nav-item"
        );
        const navImg = section.querySelectorAll(".pixel-tabs-content-item");
        const navDescription = section.querySelectorAll(
          ".pixel-tabs-head .pixel-tabs-description"
        );
        const totalTabs = navImg.length;

        const allSlideScrollTime = 70;
        const lastSlideScrollTime = 120;

        const totalHeightVh =
          (totalTabs - 1) * allSlideScrollTime + lastSlideScrollTime;
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
              const vh =
                i === totalTabs - 1 ? lastSlideScrollTime : allSlideScrollTime;
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

            navItems.forEach((el, i) =>
              el.classList.toggle("active", i === index)
            );
            navImg.forEach((el, i) =>
              el.classList.toggle("active", i === index)
            );
            navDescription.forEach((el, i) =>
              el.classList.toggle("active", i === index)
            );
          },
        });

        navItems.forEach((item, index) => {
          item.addEventListener("click", () => {
            let vhSum = 0;
            for (let i = 0; i <= index; i++) {
              vhSum +=
                i === totalTabs - 1 ? lastSlideScrollTime : allSlideScrollTime;
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
        const navItems = section.querySelectorAll(
          ".pixel-tabs-head .pixel-tabs-nav-item"
        );
        const navImg = section.querySelectorAll(".pixel-tabs-content-item");
        const navDescription = section.querySelectorAll(
          ".pixel-tabs-head .pixel-tabs-description"
        );

        navItems.forEach((item, index) => {
          item.addEventListener("click", () => {
            navItems.forEach((el, i) =>
              el.classList.toggle("active", i === index)
            );

            navImg.forEach((el, i) =>
              el.classList.toggle("active", i === index)
            );

            navDescription.forEach((el, i) =>
              el.classList.toggle("active", i === index)
            );
          });
        });
      });
    }
  } else {
    ScrollTrigger.getAll().forEach((t) => t.kill());

    $(".pixel-tabs-body .pixel-tabs-nav-item").removeClass("active");
    $(".pixel-tabs-body .pixel-tabs-accordion-body").slideUp();

    const $firstItem = $(
      ".pixel-tabs-body .pixel-tabs-content-item:first-child"
    );
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
let simpleTextSliderSection = document.querySelectorAll(
  ".simple-text-slider-section"
);

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

  const simpleTextSliderDotsWrapper = section.querySelector(
    ".simple-text-slider-dots-wrapper"
  );

  const totalHeightVh =
    (totalTabs - 1) * allSlideScrollTime + lastSlideScrollTime;
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
        const vh =
          i === totalTabs - 1 ? lastSlideScrollTime : allSlideScrollTime;
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

// <!-- Start tab with sider scroll & click based animation------------------------------------------------------------------------>
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
let processSectionWrapper = processSection.querySelector(
  ".process-section-wrapper"
);

// Start set process-section-sub-title height--------------------------------------------------------------------------------
const processSectionHeading = processSection.querySelector(
  ".process-section-heading"
);
const currentProcessSectionHeadingHeight = processSectionHeading.offsetHeight;
const processSectionTitleHeight = processSection.querySelector(
  ".process-section-sub-title"
).offsetHeight;
processSectionHeading.style.height =
  currentProcessSectionHeadingHeight + processSectionTitleHeight + "px";
// End set process-section-sub-title height--------------------------------------------------------------------------------

let processSectionTitleWrapper = processSection.querySelector(
  ".process-section-title-wrapper"
);
let processTabImgWrapper = processSection.querySelector(
  ".process-tab-img-wrapper"
);
let processTabImgContentWrapper = processTabImgWrapper.querySelector(
  ".process-tab-img-content-wrapper"
);

// Start set process-img-layer-white width--------------------------------------------------------------------------------
const processImgLayer =
  processTabImgWrapper.querySelector(".process-img-layer");
const processTabImgContent = processTabImgWrapper.querySelectorAll(
  ".process-tab-img-content"
);
const processImgLayerWhite = processTabImgWrapper.querySelector(
  ".process-img-layer-white"
);
// End set process-img-layer-white width--------------------------------------------------------------------------------

// Start process-tab-content-list gap--------------------------------------------------------------------------------
const processTabContentList = processSection.querySelector(
  ".process-tab-content-list"
);
let allProcessTabWidth = 0;
processTabContentList.querySelectorAll(".process-tab").forEach((item) => {
  allProcessTabWidth += item.offsetWidth;
});
let processTabContentListGap =
  (processTabContentList.offsetWidth - allProcessTabWidth) / 3;
// End process-tab-content-list gap--------------------------------------------------------------------------------

// Start process-tab-bar-animation width--------------------------------------------------------------------------------
const processTabBarWrapper = processSection.querySelector(
  ".process-tab-bar-wrapper"
);
const processTabBarAnimation = processSection.querySelector(
  ".process-tab-bar-animation"
);
const processTabs = processSection.querySelectorAll(".process-tab");
let processTabBarAnimationWidth;
if (window.innerWidth > 991) {
  processTabBarAnimationWidth = 0;
  processTabBarAnimationWidth +=
    processTabs[0].offsetWidth + processTabContentListGap / 2;
  processTabBarAnimation.style.width = processTabBarAnimationWidth + "px";
}
// End process-tab-bar-animation width--------------------------------------------------------------------------------

let processSectionDescriptionWrapper = processSection.querySelector(
  ".process-section-description-wrapper"
);

let processTabImgContents = processTabImgWrapper.querySelectorAll(
  ".process-tab-img-content"
);

const visibleLetters = processSection.querySelectorAll(
  ".hero-title-word > .hero-title-letter"
);
const hiddenLetters = processSection.querySelectorAll(
  ".hero-title-hidden-letters .hero-title-letter"
);

const processImgSection = processSection.querySelector(".process-img-section");

const processSliderImgWrapper = processImgSection.querySelector(
  ".process-slider-img-wrapper"
);

const processSliderMainImgWrapper = processImgSection.querySelector(
  ".process-slider-main-img-wrapper"
);
processSliderMainImgWrapper.style.setProperty(
  "width",
  "var(--processSliderImgWrapperWidth-0)"
);

let processSliderMainImgs = processImgSection.querySelectorAll(
  ".process-slider-main-img"
);

let processSliderTitles = processImgSection.querySelectorAll(
  ".process-slider-title"
);

let processSliderDescriptions = processImgSection.querySelectorAll(
  ".process-slider-description"
);

let processSliderGridWrapper;
if (window.innerWidth > 1024) {
  // Start Desktop---------
  processSliderGridWrapper = processImgSection.querySelector(
    ".process-slider-grid-wrapper.max-lg-d-none"
  );
  // End Desktop---------
} else {
  // Start Mobile---------
  processSliderGridWrapper = processImgSection.querySelector(
    ".process-slider-grid-wrapper.lg-d-none"
  );
  // End Mobile---------
}

let processSliderGridContents = processSliderGridWrapper.querySelectorAll(
  ".process-slider-grid-content"
);

// Start create process slider dots--------------------------------------------------------------------------------
const processSliderDots = processImgSection.querySelector(
  ".process-slider-dots"
);

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
tl.to(
  processSectionTitleWrapper.querySelector(
    ".process-section-title:first-child"
  ),
  {
    delay: 1,
    color: "var(--skyblue)",
    duration: 0.5,
  }
);
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
          const wordWrapper = processSectionTitleWrapper.querySelector(
            ".hero-title-word-wrapper"
          );
          const hiddenWrapper = processSectionTitleWrapper.querySelector(
            ".hero-title-hidden-letters"
          );

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
        let processTabImgContentWidth =
          processTabImgContent[0].offsetWidth + "px";
        processImgLayerWhite.style.width = processTabImgContentWidth;
        processImgLayer.style.transform = `translateX(${processTabImgContentWidth})`;
      },

      onUpdate: function () {
        if (this.progress() === 1) {
          processSectionHeading.style.height = "auto";
        } else {
          processSectionHeading.style.height =
            currentProcessSectionHeadingHeight +
            processSectionTitleHeight +
            "px";
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
          processSectionHeading.style.height =
            currentProcessSectionHeadingHeight +
            processSectionTitleHeight +
            "px";
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
      window.innerWidth <= 479
        ? "265%"
        : window.innerWidth <= 767
        ? "150%"
        : "120%",
    duration: 1.5,
    onComplete: () => {
      let processTabImgContentWidth =
        processTabImgContent[0].offsetWidth + "px";
      processImgLayerWhite.style.width = processTabImgContentWidth;
      processImgLayer.style.transform = `translateX(${processTabImgContentWidth})`;
      // Start for responsive <= 991-----------
      processTabImgContentWrapper.style.transform = `translateX(${
        processTabImgContentWidth - processTabImgContentWidth
      })`;
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
      processSection
        .querySelector(".process-tab-content")
        .classList.add("active");
      processTabs[0].classList.add("active");
    } else {
      gsap.to(processTabBarAnimation, { opacity: 0 });
      processTabImgContents[0].classList.remove("active");
      processSection
        .querySelector(".process-tab-content")
        .classList.remove("active");
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
    processTabBarAnimation.style.width =
      processTabBarAnimationWidth +
      (index * processTabContentListGap) / 2 +
      "px";
  }

  let processTabBarAnimation2 = processSection.querySelector(
    ".process-tab-bar-animation-2"
  );

  if (index === processTabs.length - 1) {
    processSection
      .querySelector(".process-slider-content")
      .classList.add("active");
    processTabBarAnimation2.style.width = "100%";
  } else {
    processSection
      .querySelector(".process-slider-content")
      .classList.remove("active");
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
    processSection
      .querySelector(".process-tab-content-wrapper")
      .style.setProperty("--index", index);
    processImgLayer.style.transform = `translateX(${activeImg.offsetWidth}px)`;
    processTabImgContentWrapper.style.transform = `translateX(-${
      translateX - activeImg.offsetWidth
    }px)`;
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
      processImgSection
        .querySelectorAll(".slider-dot")[0]
        .classList.add("active");
    } else {
      gsap.to(processSliderTitles[0], {
        top: "100%",
        duration: 1.5,
      });
      processSliderMainImgs[0].classList.remove("show-shadow");
      processImgSection
        .querySelectorAll(".slider-dot")[0]
        .classList.remove("active");
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
        "--processSliderImgWrapperWidth":
          processSliderImgWrapper.offsetWidth + "px",
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
    const scrollToPos =
      dotScrollStart + (dotScrollEnd - dotScrollStart) * progress;

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
  processImgSection.style.setProperty(
    "--containerWidth",
    `${processImgSection.querySelector(".container").clientWidth}px`
  );

  setTimeout(() => {
    processSliderMainImgWrapper.style.setProperty(
      "width",
      "var(--processSliderImgWrapperWidth-0)"
    );

    processSliderMainImgs.forEach((processSliderMainImg, index) => {
      processImgSection.style.setProperty(
        "--processSliderImgWrapperWidth-" + index,
        `${processSliderMainImg.clientWidth}px`
      );
    });
  }, 1000);

  if (window.innerWidth > 991) {
    processImgSection.style.setProperty(
      "--processSliderImgWrapperWidth",
      `${processSliderImgWrapper.clientWidth}px`
    );
  } else {
    processImgSection.style.setProperty(
      "--processSliderImgWrapperWidth",
      `${
        processSection.querySelector(".process-tab-slider-content").clientWidth
      }px`
    );
  }
}

setContentOutOfContainer();
window.addEventListener("resize", setContentOutOfContainer);
// End set gray layer width & position--------------------------------------------------------------------------------
// <!-- End tab with sider scroll & click based animation------------------------------------------------------------------------>
