const hamburger = document.querySelector(".hamburger");
const menuLinks = document.querySelector(".menu-links");
const links = document.querySelectorAll(".menu-links li");

hamburger.addEventListener("click", () => {
    menuLinks.classList.toggle("open");
});