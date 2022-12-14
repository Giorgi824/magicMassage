window.addEventListener("load", () => {
  const magicReview = document.querySelector(".magic-review-boxes");
  const allBoxes = [
    ...document.querySelectorAll(".magic-review-boxes .boxes>div"),
  ];
  const boxesContainer = document.querySelector(".magic-review-boxes .boxes");
  const boxesLength = allBoxes.length;
  const dotsParent = document.createElement("div");

  dotsParent.classList.add("review-dots");
  for (let i = 0; i < boxesLength; i++) {
    let span = document.createElement("span");
    dotsParent.insertAdjacentElement("afterbegin", span);
  }
  magicReview.insertAdjacentElement("beforeend", dotsParent);
  const dots = document.querySelectorAll(".review-dots>span");
  dots[0].classList.add("active");
  dots.forEach((item, idx) => {
    item.addEventListener("click", function (e) {
      let curr = e.currentTarget;
      let elWidth = allBoxes[idx].offsetWidth;
      let moving = elWidth * idx;
      let containerGap = window
        .getComputedStyle(boxesContainer)
        .getPropertyValue("grid-gap")
        .slice(0, 2);
      let toNmGap = Number(containerGap);
      let increased = idx;
      let indexed = increased++;
      dots.forEach((item) => item.classList.remove("active"));
      curr.classList.add("active");
      boxesContainer.style.transform = `translateX(-${
        moving + toNmGap * indexed
      }px)`;
    });
  });
  window.addEventListener("resize", () => {
    let windowWidth = window.innerWidth;
    if (boxesContainer.hasAttribute("style") && windowWidth >= 440) {
      boxesContainer.style.transform = "translateX(0)";
    }
  });

  let startingX, movingX;
  function touchStart(evt) {
    startingX = evt.touches[0].clientX;
  }
  function touchMove(evt) {
    movingX = evt.touches[0].clientX;
  }
  function touchEnd() {
    let dotActive = document.querySelector(".review-dots .active");
    if (startingX + 100 < movingX && window.innerWidth <= 440) {
      dotActive.previousElementSibling
        ? dotActive.previousElementSibling.click()
        : false;
    } else if (startingX - 100 > movingX && window.innerWidth <= 440) {
      dotActive.nextElementSibling
        ? dotActive.nextElementSibling.click()
        : false;
    }
  }

  allBoxes.forEach((item, idx) => {
    item.addEventListener("touchstart", touchStart);
    item.addEventListener("touchmove", touchMove);
    item.addEventListener("touchend", touchEnd);
  });
});
