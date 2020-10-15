// ---- MENU BTN HAMBURGER ---- //
const menuLinks = document.querySelector(".menu-links");
const btnMenuLinks = document.querySelector(".btn-menu-links");
let btnMenuLinksOpen = false;

btnMenuLinks.addEventListener("click", () => {
    
    if(btnMenuLinksOpen) {
        menuLinks.classList.toggle("open");
        btnMenuLinks.classList.remove("open");
        btnMenuLinksOpen = false;
    }
    else {
        menuLinks.classList.toggle("open");
        btnMenuLinks.classList.add("open");
        btnMenuLinksOpen = true;
    }

});

$('.menu-links li').click(() => {

    if(btnMenuLinksOpen) {
        menuLinks.classList.toggle("open");
        btnMenuLinks.classList.remove("open");
        btnMenuLinksOpen = false;
    }
    else {
        pass;
    }
    
});
