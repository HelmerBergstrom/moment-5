"use strict";

document.addEventListener("DOMContentLoaded", function () {
    const hamburgare = document.querySelector(".hamburger");
    const mobilMeny = document.querySelector(".mobile-menu");

    hamburgare.addEventListener("click", () => {
        mobilMeny.classList.toggle("open");
        hamburgare.classList.toggle("open");
    })
})

document.addEventListener("DOMContentLoaded", function () {
    const box = document.querySelector(".div-animation");

    box.addEventListener("mouseover", function() {
        box.classList.add("stay");
    })
})

document.addEventListener("DOMContentLoaded", function () {
    const animationMenu = document.querySelector(".animation-menu");

    window.addEventListener("scroll", function () {
        if(window.scrollY > 50) {
            animationMenu.classList.add("scrolled");
        } else {
            animationMenu.classList.remove("scrolled");
        }
    })
})