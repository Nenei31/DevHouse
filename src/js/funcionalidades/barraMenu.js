// FUNCION PARA EL TOGGLE DE BARRA//
const navtoggle = document.querySelector(".nav-toggle-menu")
const navMenu = document.querySelector(".nav-menu-luciana")

navtoggle.addEventListener("click", () => {
    navMenu.classList.toggle("nav-menu_visible");

    if (navMenu.classList.contains("nav-menu_visible")) {
        navToogle.setAttribute("arial-label", "Cerrar menú");
    } else {
        navToogle.setAttribute("arial-label", "Abrir menú");
    }
});
