// const menuBtn = document.querySelector('.menuBtn');
// let menuOpen = false;

// menuBtn.addEventListener('click', function() {
//     if (!menuOpen) {
//         menuBtn.classList.add('open');
//         menuOpen = true;
//     } else {
//         menuBtn.classList.remove('open');
//         menuOpen = false;
//     }
// });


const hamburgerIcon = document.querySelector('.menuBtn');
const overlay = document.querySelector('.overlay');
const headerLinks = document.querySelector('.header__links');

hamburgerIcon.addEventListener('click', openMenu);

function openMenu() {
    hamburgerIcon.classList.toggle("open");
    overlay.classList.toggle("open");
    headerLinks.classList.toggle("open");
};


