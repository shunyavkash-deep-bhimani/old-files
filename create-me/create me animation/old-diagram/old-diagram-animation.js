const resizeObserver = new ResizeObserver((entries) => {
  entries.forEach((entry) => {
    const element = entry.target;
    const width = element.offsetWidth;
    const fontSize = (width / 480) * 48;
    element.querySelector(".diagram-item-text").style.fontSize = fontSize + "px";
  });
});

document.querySelectorAll(".diagram-section-v2 .diagram-item").forEach((element) => {
  resizeObserver.observe(element);
});

// Start diagram animation on view----------------------------------------------------------------
function isMobileDevice() {
  return /Mobi|Android|iPhone|iPad|iPod|Opera Mini|IEMobile/i.test(navigator.userAgent);
}

function portraitAnimation() {
  // if (window.innerHeight > 650) {
  //   document.querySelector(".diagram-section-v2-wrapper").style.minHeight = "100vh";
  // }

  gsap.set(".diagram-content-container", { opacity: 0 });

  gsap.to(".diagram-section-v2 .diagram-section-v2-wrapper", {
    scrollTrigger: {
      trigger: ".diagram-section-v2 .diagram-section-v2-wrapper",
      start: "top top",
      end: "bottom bottom",
      // markers: true,
      // pin: window.innerWidth > 991 && window.innerHeight > 650 ? ".diagram-section-v2-wrapper" : window.innerWidth <= 991 && window.innerHeight > 650 ? ".diagram-section-v2-wrapper" : false,
      onEnter: () => {
        setTimeout(
          () => {
            document.querySelector(".diagram-wrapper")?.classList.add("active");
            gsap.to(".diagram-white-layer-img", { opacity: 1, duration: 1, delay: 2, ease: "ease-in-out" });
            gsap.to(".diagram-content-container", { opacity: 1, duration: 1, delay: 3, ease: "ease-in-out" });

            setTimeout(() => {
              document.querySelectorAll(".diagram-layer").forEach((diagramLayer) => (diagramLayer.style.display = "none"));
              document.querySelectorAll(".diagram-item-v2").forEach((diagramItemV2) => (diagramItemV2.style.pointerEvents = "auto"));
              document.querySelector(".diagram-section-v2-wrapper .container").style.overflow = "unset";
              document.querySelector(".diagram-section-v2-wrapper .diagram-wrapper").style.overflow = "unset";
            }, 3000);
          },
          window.innerHeight > 650 ? 1500 : 500
        );
      },
    },
  });
}

function landscapeAnimation() {
  //   document.querySelector(".diagram-section-v2-wrapper").style.minHeight = "unset";

  gsap.set(".diagram-content-container", { opacity: 0 });

  gsap.to(".diagram-section-v2", {
    scrollTrigger: {
      trigger: ".diagram-section-v2",
      start: "top top",
      end: "bottom bottom",
      //   markers: true,
      onEnter: () => {
        setTimeout(
          () => {
            document.querySelector(".diagram-wrapper")?.classList.add("active");
            gsap.to(".diagram-white-layer-img", { opacity: 1, duration: 1, delay: 2, ease: "ease-in-out" });
            gsap.to(".diagram-content-container", { opacity: 1, duration: 1, delay: 3, ease: "ease-in-out" });

            setTimeout(() => {
              document.querySelectorAll(".diagram-layer").forEach((diagramLayer) => (diagramLayer.style.display = "none"));
              document.querySelectorAll(".diagram-item-v2").forEach((diagramItemV2) => (diagramItemV2.style.pointerEvents = "auto"));
              document.querySelector(".diagram-section-v2-wrapper .container").style.overflow = "unset";
              document.querySelector(".diagram-section-v2-wrapper .diagram-wrapper").style.overflow = "unset";
            }, 3000);
          },
          window.innerHeight > 650 ? 1500 : 500
        );
      },
    },
  });
}

if (isMobileDevice()) {
  console.log("Mobile device detected");

  if (window.matchMedia("(orientation: portrait)").matches) {
    console.log("Portrait mode");
    portraitAnimation();
  } else {
    console.log("Landscape mode");
    landscapeAnimation();
  }

  window.matchMedia("(orientation: portrait)").addEventListener("change", (e) => {
    location.reload();

    if (e.matches) {
      console.log("Changed to portrait");
      portraitAnimation();
    } else {
      console.log("Changed to landscape");
      landscapeAnimation();
    }
  });
} else {
  console.log("Desktop device detected");
  portraitAnimation();
}
// End diagram animation on view----------------------------------------------------------------

// Start tab animation----------------------------------------------------------------
let diagramSectionV2 = document.querySelector(".diagram-section-v2");

let diagramWrapper = diagramSectionV2.querySelector(".diagram-wrapper");
let diagramItemV2s = diagramWrapper.querySelectorAll(".diagram-item-v2");

let diagramTabProgress = diagramSectionV2.querySelector(".diagram-tab-progress");

let diagramTabWrapper = diagramSectionV2.querySelector(".diagram-tab-wrapper");
let diagramTabItems = diagramTabWrapper.querySelectorAll(".diagram-tab-item");

let diagramTabDescriptions = diagramTabWrapper.querySelectorAll(".diagram-tab-description");

let diagramTabContentWrapper = diagramSectionV2.querySelector(".diagram-tab-content-wrapper");
let diagramTabContentItems = diagramTabContentWrapper.querySelectorAll(".diagram-tab-content-item");

diagramTabItems.forEach((diagramTabItem, index) => {
  diagramTabItem.addEventListener("click", () => {
    /* setTimeout(() => {
        const abc = document.getElementById("abc");
        const y = abc.getBoundingClientRect().top + window.scrollY + 70;

        window.scrollTo({
          top: y,
          behavior: "smooth", // or "instant"
        });
      }, 500); */

    if ($(diagramTabItem).hasClass("active")) {
      $(diagramTabItem).removeClass("active");
      $(diagramItemV2s[index]).removeClass("active");
      $(diagramTabContentItems[index]).slideUp();
    } else {
      $(diagramTabItems).removeClass("active");
      $(diagramItemV2s).removeClass("active");
      $(diagramTabContentItems).slideUp();
      $(diagramTabItem).addClass("active");
      $(diagramItemV2s[index]).addClass("active");
      $(diagramTabContentItems[index]).slideDown();
    }

    diagramTabProgress.style.setProperty("--tabActiveIndex", index);

    // Check if ANY tab is active
    let anyActive = [...diagramTabItems].some((item) => item.classList.contains("active"));
    if (anyActive) {
      $(diagramTabWrapper).addClass("active");
      $(diagramTabDescriptions).slideUp();
      $(diagramTabProgress).slideDown();
      $(diagramTabContentWrapper).addClass("active");
    } else {
      $(diagramTabWrapper).removeClass("active");
      $(diagramTabDescriptions).slideDown();
      $(diagramTabProgress).slideUp();
      $(diagramTabContentWrapper).removeClass("active");
    }

    let isactive = diagramTabContentWrapper.classList.contains("active");
    if (isactive) {
      setTimeout(() => {
        let setMinHeight = diagramTabContentWrapper.clientHeight + 1 + "px";

        diagramSectionV2.querySelector(".diagram-tab-content-main").style.setProperty("--setMinHeight", setMinHeight);
        $(".diagram-tab-content-main").addClass("active");
      }, 1000);
    } else {
      diagramSectionV2.querySelector(".diagram-tab-content-main").style.setProperty("--setMinHeight", "auto");
      $(".diagram-tab-content-main").removeClass("active");
    }
  });
});

diagramItemV2s.forEach((item, index) => {
  item.addEventListener("click", () => {
    diagramTabItems[index].click(); // Trigger tab click
  });
});
// End tab animation----------------------------------------------------------------
