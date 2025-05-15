/* <script src="https://rglhpcjp-5500.inc1.devtunnels.ms/createMe-animatiom.js"></script> */

let stickyGradientSections = Array.from(
  document.querySelectorAll(".sticky-gradient-section")
);

if (stickyGradientSections.length) {
  stickyGradientSections.forEach((stickyGradientSection) => {
    stickyGradientSection.querySelectorAll(".sticky-gradient-content-wrapper");

    let contentLength = Array.from(
      stickyGradientSection.querySelectorAll(".sticky-gradient-content")
    ).length;

    stickyGradientSection.style.minHeight = 50 * contentLength + 50 + "vh";
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
    function animateGradientOnScroll(
      stickyElement,
      startPos,
      endPos,
      progress
    ) {
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

    const stickyGradientSections = document.querySelectorAll(
      ".sticky-gradient-section"
    );

    stickyGradientSections.forEach((stickyGradientSection) => {
      // Select all sticky gradient content wrappers (slides)
      const stickyGradientContentWrappers =
        stickyGradientSection.querySelectorAll(
          ".sticky-gradient-content-wrapper"
        );

      // Calculate total slides
      const totalSlides = stickyGradientContentWrappers.length;

      stickyGradientContent.forEach((title, i) => {
        gsap.set(title, {
          opacity: i === 0 ? 1 : 0, // First element visible initially
        });

        let isLastSlide = i === totalSlides - 1; // Check if it's the last slide

        ScrollTrigger.create({
          trigger: title,
          start: "top top",
          end: "bottom top",
          pin: !isLastSlide, // Pin all except the last one
          pinSpacing: isLastSlide, // Maintain spacing for the last slide
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
          navDotsContainer
            .querySelectorAll(".nav-dots-items")
            .forEach((dot) => {
              dot.classList.remove("active");
            });
          navDot.classList.add("active");

          activeDotFound = true; // Stop once we find the first active dot
        }
      });
    });
  });
}
