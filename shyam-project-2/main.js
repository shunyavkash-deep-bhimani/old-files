function tabFunc(tabTrigger, tabContent) {
  const tabTriggers = document.querySelectorAll(tabTrigger);
  const tabContents = document.querySelectorAll(tabContent);
  const classActive = "active";
  const classShow = "show";
  let currentIndex = 0;

  for (let i = 0; i < tabTriggers.length; i++) {
    tabTriggers[i].addEventListener("click", (event) => {
      currentIndex = i;

      tabTriggers.forEach((trigger) => {
        trigger.classList.remove(classActive);
      });
      tabTriggers[i].classList.add(classActive);

      tabContents.forEach((content) => {
        content.classList.remove(classShow);
      });
      tabContents[i].classList.add(classShow);
    });
  }
}

tabFunc(".product-details-link-item", ".product-details-tab");
