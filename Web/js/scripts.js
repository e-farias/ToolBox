// ---- MENU BTN HAMBURGER ---- //
const menuLinks = document.querySelector(".menu-links");
const links = document.querySelectorAll(".menu-links li");
const btnMenuLinks = document.querySelector(".btn-menu-links");
let btnMenuLinksOpen = false;

btnMenuLinks.addEventListener("click", () => {
    
    if(!btnMenuLinksOpen) {
        menuLinks.classList.toggle("open");
        btnMenuLinks.classList.add("open");
        btnMenuLinksOpen = true;
    }
    else {
        menuLinks.classList.toggle("open");
        btnMenuLinks.classList.remove("open");
        btnMenuLinksOpen = false;
    }

});