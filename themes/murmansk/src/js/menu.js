//
// // Burger menus
// document.addEventListener('DOMContentLoaded', function() {
//     // open
//     const burger = document.querySelectorAll('.navbar-burger');
//     const menu = document.querySelectorAll('.navbar-menu');
//     if (burger.length && menu.length) {
//         for (var i = 0; i < burger.length; i++) {
//             burger[i].addEventListener('click', function() {
//                 for (var j = 0; j < menu.length; j++) {
//                     menu[j].classList.toggle('hidden');
//                 }
//             });
//         }
//     }
//
//     // close
//     const close = document.querySelectorAll('.navbar-close');
//     const backdrop = document.querySelectorAll('.navbar-backdrop');
//
//     if (close.length) {
//         for (var i = 0; i < close.length; i++) {
//             close[i].addEventListener('click', function() {
//                 for (var j = 0; j < menu.length; j++) {
//                     menu[j].classList.toggle('hidden');
//                 }
//             });
//         }
//     }
//
//     if (backdrop.length) {
//         for (var i = 0; i < backdrop.length; i++) {
//             backdrop[i].addEventListener('click', function() {
//                 for (var j = 0; j < menu.length; j++) {
//                     menu[j].classList.toggle('hidden');
//                 }
//             });
//         }
//     }
// });
//
// document.addEventListener('DOMContentLoaded', function() {
//     const burgers = document.querySelectorAll('.navbar-burger');
//     const menus = document.querySelectorAll('.navbar-menu');
//     const closes = document.querySelectorAll('.navbar-close');
//     const backdrops = document.querySelectorAll('.navbar-backdrop');
//
//     // Вспомогательная функция для переключения видимости меню
//     function toggleMenuVisibility() {
//         menus.forEach(menu => menu.classList.toggle('hidden'));
//     }
//
//     // При клике на бургер (открывающую кнопку) переключаем видимость меню
//     burgers.forEach(burger => {
//         burger.addEventListener('click', toggleMenuVisibility);
//     });
//
//     // При клике на крестик (закрывающую кнопку) переключаем видимость меню
//     closes.forEach(close => {
//         close.addEventListener('click', toggleMenuVisibility);
//     });
//
//     // То же самое при клике на задний фон (подложку меню)
//     backdrops.forEach(backdrop => {
//         backdrop.addEventListener('click', toggleMenuVisibility);
//     });
// });
//
// document.addEventListener('DOMContentLoaded', function() {
//     // Открывать/закрывать меню при клике на бургер
//     const burger = document.querySelectorAll('.navbar-burger');
//     const menu = document.querySelectorAll('.navbar-menu');
//
//     burger.forEach(function(burgerElement, index) {
//         burgerElement.addEventListener('click', function() {
//             menu[index].classList.toggle('hidden');
//         });
//     });
//
//     // Закрывать меню при клике на крестик или фон
//     const close = document.querySelectorAll('.navbar-close');
//     const backdrop = document.querySelectorAll('.navbar-backdrop');
//
//     function toggleMenu() {
//         menu.forEach(function(menuElement) {
//             menuElement.classList.toggle('hidden');
//         });
//     }
//
//     close.forEach(function(closeElement) {
//         closeElement.addEventListener('click', toggleMenu);
//     });
//
//     backdrop.forEach(function(backdropElement) {
//         backdropElement.addEventListener('click', toggleMenu);
//     });
// });
