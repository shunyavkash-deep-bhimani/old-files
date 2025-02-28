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

      //   tl.to(
      //     ".banner-animation-2-bar-dot",
      //     { opacity: 1, ease: "none", duration: 0.1 },
      //     "-=0"
      //   );

      //   tl.to(
      //     ".banner-animation-2-bar + .banner-animation-main-title-2",
      //     { opacity: 1, ease: "none", duration: 0.1 },
      //     "-=0"
      //   );

      //   tl.to(
      //     ".banner-animation-3 .banner-animation-main-title",
      //     { opacity: 1, ease: "none", duration: 0.1 },
      //     "-=0"
      //   );

      //   tl.to(
      //     contentItems[0],
      //     { y: 0, opacity: 1, ease: "none", duration: 0.1 },
      //     "-=0"
      //   );

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

      //   tl.to(
      //     ".banner-animation-2-wrapper-2 .banner-animation-main-title-2",
      //     { opacity: 1, ease: "none", duration: 0.1 },
      //     "-=0"
      //   );

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

      //   tl.to(".banner-rotate-content", {
      //     opacity: 1,
      //     ease: "none",
      //   });
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
