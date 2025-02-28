// Start gsap animation-------------------------------------------------------------------------------------------------------------------------------------
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
// End gsap animation-------------------------------------------------------------------------------------------------------------------------------------
