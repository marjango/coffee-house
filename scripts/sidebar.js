const burgerIcon = document.querySelector(".button-icon_burger");
burgerIcon.addEventListener("click", toggleMenu);

function toggleMenu() {
  const windowWidthBefore = document.documentElement.clientWidth;
  document.body.classList.toggle("scroll-disabled");
  const windowWidthAfter = document.documentElement.clientWidth;

  if (windowWidthBefore < windowWidthAfter) {
    document.body.style.paddingRight = `${
      windowWidthAfter - windowWidthBefore
    }px`;
  } else {
    document.body.style.paddingRight = "";
  }

  burgerIcon.classList.toggle("button-icon_burger__cross");
  const sidebar = document.querySelector(".sidebar");
  sidebar.classList.toggle("sidebar__active");
}

function followLink(e) {
  e.preventDefault();
  closeMenu();
  const targetHref = e.target.closest("a")?.href;
  if (!targetHref) return;
  setTimeout(() => {
    location.href = targetHref;
  }, 300);
}
const sidebarNav = document.querySelector(".sidebar__navigation");
sidebarNav.addEventListener("click", followLink);

document
  .querySelector(".sidebar__button")
  .addEventListener("click", followLink);

document.querySelector(".logo").addEventListener("click", followLink);

function closeMenu() {
  document.body.classList.remove("scroll-disabled");
  document.body.style.paddingRight = "";
  burgerIcon.classList.remove("button-icon_burger__cross");
  const sidebar = document.querySelector(".sidebar");
  sidebar.classList.remove("sidebar__active");
}

window.addEventListener("resize", () => {
  if (document.documentElement.clientWidth > 768) closeMenu();
});
