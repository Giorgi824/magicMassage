window.addEventListener("load", () => {
  window.addEventListener("resize", function () {
    heightOfElements(".faq-hd");
    maintainFaq();
  });
  // FAQ section code
  const faqListHidden = document.querySelectorAll(".faq-list>div");
  const seeAll = document.querySelector(".see-all-faqs");
  const seeAllIcon = seeAll.querySelector("img");
  let hiddenFaqsEl;
  // FAQ question dropDown

  function heightOfElements(elClass) {
    const elements = document.querySelectorAll(`${elClass}`);
    elements.forEach((item, idx) => {
      let outerHg = item.offsetHeight;
      let elementParent = item.parentNode;
      elementParent.style.height = `${outerHg}px`;
    });
  }
  heightOfElements(".faq-hd");

  // maintain active FAQ tabs on resize
  function maintainFaq() {
    const actived = document.querySelectorAll(".faq-bd.active");
    actived.forEach((item, idx) => {
      item.parentNode.style.height = "auto";
    });
  }

  const faqHd = document.querySelectorAll(".faq-hd");
  faqHd.forEach((item) => {
    item.addEventListener("click", function (e) {
      let el = e.currentTarget;
      let sibl = el.nextElementSibling;
      let hgItem = item.offsetHeight;
      let elParent = el.parentNode;
      if (sibl.classList.contains("active")) {
        elParent.style.height = `${hgItem}px`;
        el.querySelector("img").classList.remove("rotate");
        el.classList.remove("active");
        setTimeout(function () {
          sibl.classList.remove("active");
          //   elParent.style.height = "auto";
        }, 200);
      } else {
        el.querySelector("img").classList.add("rotate");
        el.classList.add("active");
        elParent.style.height = `${hgItem}px`;
        sibl.classList.add("active");
        let hgSib = sibl.offsetHeight;
        let botHg = hgItem + hgSib;
        elParent.style.height = `${botHg}px`;
        setTimeout(function () {
          //   elParent.style.height = "auto";
        }, 200);
      }
    });
  });

  // check if there are more than 4 question FAQ
  if (faqListHidden.length > 4) {
    faqListHidden.forEach((item, idx) => {
      if (getComputedStyle(item).display === "none") {
        item.classList.add("hidden-faqs");
      }
    });
    hiddenFaqsEl = document.querySelectorAll(".hidden-faqs");
    seeAll.addEventListener("click", function (e) {
      seeAllIcon.classList.toggle("rotate");
      hiddenFaqsEl.forEach((item) => {
        item.classList.toggle("blocked-el");
        heightOfElements(".hidden-faqs .faq-hd");
      });
    });
  } else {
    seeAll.style.display = "none";
  }
});
