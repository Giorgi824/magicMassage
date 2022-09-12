window.addEventListener("load", () => {
  const navLinks = document.querySelectorAll("header ul a");
  const sections = document.querySelectorAll("#container>section");
  const headerHeight = document.querySelector("header").offsetHeight;
  function activeLink() {
    let sectionNumber = sections.length;
    while (
      --sectionNumber &&
      window.scrollY + headerHeight * 2 < sections[sectionNumber].offsetTop
    ) {}
    removeActive();
    navLinks[sectionNumber].classList.add("active");
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      removeActive();
      console.log(navLinks[--navLinks.length]);
      navLinks[--navLinks.length].classList.add("active");
    }
  }
  function removeActive() {
    navLinks.forEach((item) => item.classList.remove("active"));
  }
  activeLink();
  window.addEventListener("scroll", activeLink);
});
