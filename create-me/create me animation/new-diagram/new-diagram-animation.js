const resizeObserver = new ResizeObserver((entries) => {
  entries.forEach((entry) => {
    const element = entry.target;
    const width = element.offsetWidth;
    const fontSize = (width / 480) * 48;
    element.querySelector(".diagram-item-text").style.fontSize = fontSize + "px";
  });
});

document.querySelectorAll(".diagram-tab-img-wrapper .diagram-tab-round").forEach((element) => {
  resizeObserver.observe(element);
});

// Start diagram animation on view----------------------------------------------------------------
function desktopAnimation() {
  const diagramTabRoundContents = document.querySelectorAll(".diagram-tab-round-content");
  const diagramTabRounds = document.querySelectorAll(".diagram-tab-round");
  let diagramTabWrapper = document.querySelector(".diagram-tab-wrapper:has(.diagram-tab-item-content-v3)");

  if (window.innerHeight > 750) {
    ScrollTrigger.create({
      trigger: ".diagram-section-v3",
      start: "top top",
      end: "bottom 90%",
      pin: ".diagram-section-v3-wrapper",
      // markers: true,
    });
  }

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".diagram-section-v3",
      start: window.innerHeight > 750 ? "top top" : "top 10%",
      end: window.innerHeight > 750 ? "bottom 110%" : "top top",
      scrub: 1,
      // markers: true,
    },
  });

  gsap.set(diagramTabRounds, { pointerEvents: "none", transformOrigin: "0 0" });
  gsap.set(".diagram-tab-item-content-v3", { pointerEvents: "none" });
  gsap.set(diagramTabWrapper, { y: "100%", opacity: 0 });

  // Arrays to store values
  const moveX = [];
  const moveY = [];
  const sX = [];
  const sY = [];
  const itemTexts = [];
  const itemImgs = [];

  diagramTabRounds.forEach((round, i) => {
    const target = diagramTabRoundContents[i];
    const text = round.querySelector(".diagram-item-text");
    const img = round.querySelector(".diagram-tab-round-img");
    itemTexts.push(text);

    itemImgs.push(img);

    if (target) {
      const t = target.getBoundingClientRect();
      const r = round.getBoundingClientRect();
      moveX[i] = t.left - r.left;
      moveY[i] = t.top - r.top;
      sX[i] = t.width / r.width;
      sY[i] = t.height / r.height;
    }
  });

  tl.to(diagramTabRounds, {
    x: (i) => moveX[i],
    y: (i) => moveY[i],
    scaleX: (i) => sX[i],
    scaleY: (i) => sY[i],
    duration: 2,
    delay: 0.4,
  });

  tl.to(
    itemTexts,
    {
      opacity: 0,
      duration: 1.5,

      onUpdate: function () {
        if (this.progress() < 1) {
          $(itemTexts).css("visibility", "visible");
        } else {
          $(itemTexts).css("visibility", "hidden");
        }
      },
    },
    "<0.3"
  );

  tl.to(
    itemImgs,
    {
      opacity: 1,
      duration: 1.5,
    },
    "<0.3"
  );

  tl.to(
    diagramTabWrapper,
    {
      y: 0,
      opacity: 1,
      duration: 1.5,
      onUpdate: function () {
        if (this.progress() < 1) {
          $(".diagram-tab-round-img").removeClass("active");
          $(".diagram-tab-item-content-v3").removeClass("active");
          $(".diagram-tab-round-wrapper").removeClass("tab-active");
          $(".diagram-tab-description").slideDown(500);
          $(".diagram-tab-accordion").slideUp(500);
        }
      },
    },
    "<"
  );

  tl.to(".diagram-tab-round", { pointerEvents: "auto", duration: 0 });
  tl.to(".diagram-tab-item-content-v3", { pointerEvents: "auto", duration: 0 }, "<");
}

function mobileAnimation() {
  const diagramTabImgWrapper = document.querySelector(".diagram-tab-img-wrapper");
  const diagramTabRounds = diagramTabImgWrapper.querySelectorAll(".diagram-tab-round");
  let diagramTabContentWrapper = document.querySelector(".diagram-tab-content-wrapper");
  const diagramTabRoundV3s = diagramTabContentWrapper.querySelectorAll(".diagram-tab-round-v3");

  gsap.set(diagramTabRounds, { pointerEvents: "none", transformOrigin: "0 0" });
  gsap.set(".diagram-tab-item-content-v3", { pointerEvents: "none" });
  gsap.set([diagramTabContentWrapper, diagramTabRoundV3s], { opacity: 0 });

  // Arrays to store values
  const moveX = [];
  const moveY = [];
  const sX = [];
  const sY = [];
  const itemTexts = [];
  const itemImgs = [];

  diagramTabRounds.forEach((round, i) => {
    const target = diagramTabRoundV3s[i];
    const text = round.querySelector(".diagram-item-text");
    const img = round.querySelector(".diagram-tab-round-img");

    itemTexts.push(text);
    itemImgs.push(img);

    if (target) {
      const t = target.getBoundingClientRect();
      const r = round.getBoundingClientRect();
      moveX[i] = t.left - r.left;
      moveY[i] = t.top - r.top;
      sX[i] = t.width / r.width;
      sY[i] = t.height / r.height;
    }
  });

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".diagram-section-v3",
      start: "top 10%",
      end: "top top",
      scrub: 1,
      // markers: true,
    },
  });

  tl.to(diagramTabRounds, {
    x: (i) => moveX[i],
    y: (i) => moveY[i],
    scaleX: (i) => sX[i],
    scaleY: (i) => sY[i],
    duration: 5,
  });

  tl.to(
    itemTexts,
    {
      opacity: 0,
      duration: 5,
    },
    "<"
  );

  tl.to(
    itemImgs,
    {
      opacity: 1,
      duration: 5,
    },
    "<"
  );

  tl.to(
    diagramTabContentWrapper,
    {
      opacity: 1,
      duration: 5,

      onUpdate: function () {
        if (this.progress() < 1) {
          $(".diagram-tab-round-img").removeClass("active");
          $(".diagram-tab-item-content-v3").removeClass("active");
          $(".diagram-tab-description").slideDown(500);
          $(".diagram-tab-accordion").slideUp(500);
        }
      },
    },
    "<"
  );

  tl.to(diagramTabImgWrapper, { opacity: 0, visibility: "hidden", duration: 0 });
  tl.to(diagramTabRoundV3s, { opacity: 1, visibility: "visible", duration: 0 }, "<");
  tl.to(".diagram-tab-item-content-v3", { pointerEvents: "auto", duration: 0 }, "<");
}

if (window.innerWidth > 767) {
  console.log("Desktop animation detected");
  desktopAnimation();
} else {
  console.log("Mobile animation detected");
  mobileAnimation();
}
// End diagram animation on view----------------------------------------------------------------

// Start tab animation----------------------------------------------------------------
let diagramSectionV3 = document.querySelector(".diagram-section-v3");
let diagramTabRoundWrapper = diagramSectionV3.querySelectorAll(".diagram-tab-round-wrapper");
let diagramTabRounds = diagramSectionV3.querySelectorAll(".diagram-tab-img-wrapper .diagram-tab-round");
let diagramTabRoundImgs = diagramSectionV3.querySelectorAll(".diagram-tab-round-img");
let diagramTabItemContentV3s = diagramSectionV3.querySelectorAll(".diagram-tab-item-content-v3");

diagramTabItemContentV3s.forEach((diagramTabItemContentV3, i) => {
  diagramTabItemContentV3.style.setProperty("--imgHeight", diagramTabRoundWrapper[i].offsetHeight + "px");

  diagramTabItemContentV3.addEventListener("click", () => {
    if (window.innerWidth > 767) {
      if ($(diagramTabItemContentV3).hasClass("active")) {
        $(diagramTabItemContentV3).removeClass("active");
        $(".diagram-tab-accordion").slideUp(500);
        $(".diagram-tab-description").slideDown(500);
        $(diagramTabRoundWrapper[i]).removeClass("tab-active");
      } else {
        $(diagramTabItemContentV3s).removeClass("active");
        $(".diagram-tab-accordion").slideUp(500);
        $(".diagram-tab-description").slideDown(500);
        $(diagramTabRoundWrapper).removeClass("tab-active");
        $(diagramTabRoundImgs).removeClass("active");
        $(diagramTabItemContentV3).addClass("active");
        $(".diagram-tab-item-content-v3.active .diagram-tab-accordion").slideDown(500);
        $(".diagram-tab-item-content-v3.active .diagram-tab-description").slideUp(500);
        $(diagramTabRoundWrapper[i]).addClass("tab-active");
      }
    } else {
      if ($(diagramTabItemContentV3).hasClass("active")) {
        $(diagramTabItemContentV3).removeClass("active");
        $(".diagram-tab-description").slideDown(500);
        $(".diagram-tab-accordion").slideUp(500);
      } else {
        $(diagramTabItemContentV3s).removeClass("active");
        $(".diagram-tab-description").slideDown(500);
        $(".diagram-tab-accordion").slideUp(500);
        $(diagramTabItemContentV3).addClass("active");
        $(".diagram-tab-item-content-v3.active .diagram-tab-description").slideUp(500);
        $(".diagram-tab-item-content-v3.active .diagram-tab-accordion").slideDown(500);
      }
    }
  });
});

if (window.innerWidth > 767) {
  diagramTabRounds.forEach((diagramTabRound, i) => {
    diagramTabRound.addEventListener("click", () => {
      diagramTabItemContentV3s[i].click();
    });
  });
}
// End tab animation----------------------------------------------------------------

// Start check section bottom side show to reset tabs----------------------------------------------------------------
function checkSectionBottomHide() {
  const section = document.querySelector(".diagram-section-v3");

  if (!section) return;

  const rect = section.getBoundingClientRect();
  const threshold = window.innerHeight * 0.3; // ← Changed Here For Element Show of amount in Bottom Side

  if (rect.bottom <= threshold) {
    if (window.innerWidth > 767) {
      $(".diagram-tab-round-img").removeClass("active");
      $(".diagram-tab-item-content-v3").removeClass("active");
      $(".diagram-tab-round-wrapper").removeClass("tab-active");
      $(".diagram-tab-description").slideDown(500);
      $(".diagram-tab-accordion").slideUp(500);
    } else {
      $(".diagram-tab-round-img").removeClass("active");
      $(".diagram-tab-item-content-v3").removeClass("active");
      $(".diagram-tab-description").slideDown(500);
      $(".diagram-tab-accordion").slideUp(500);
    }
  }
}

checkSectionBottomHide();
window.addEventListener("scroll", checkSectionBottomHide);
// End check section bottom side show to reset tabs----------------------------------------------------------------
