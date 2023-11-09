//
// // Получаем ссылки на все кнопки открытия модальных окон
// var openModalBtns = document.querySelectorAll(".openModalBtn");
//
// // Добавляем обработчики событий для кнопок
// openModalBtns.forEach(function(btn) {
//     btn.addEventListener("click", function() {
//         var modalId = btn.getAttribute("data-modal");
//         var modal = document.getElementById(modalId);
//         modal.style.opacity = "1";
//         modal.style.transform = "translateY(0)";
//     });
// });
//
// // Закрытие модальных окон при щелчке на крестик
// var closeBtns = document.querySelectorAll(".close");
//
// closeBtns.forEach(function(btn) {
//     btn.addEventListener("click", function() {
//         var modalId = btn.getAttribute("data-modal");
//         var modal = document.getElementById(modalId);
//         modal.style.opacity = "0";
//         modal.style.transform = "translateY(-100%)";
//     });
// });
//
// // Закрыть модальное окно, если пользователь щелкает вне его
// window.addEventListener("click", function(event) {
//     if (event.target.classList.contains("modal")) {
//         event.target.style.opacity = "0";
//         event.target.style.transform = "translateY(-100%)";
//     }
// });


document.querySelectorAll('.request').forEach(function(element) {
    element.addEventListener('click', function() {
        document.querySelector('.modal-request').classList.toggle('active');
    });
});

document.querySelectorAll('.modal_area').forEach(function(element) {
    element.addEventListener('click', function() {
        document.querySelector('.modal-request').classList.remove('active');
    });
});

document.querySelectorAll('.modal_close').forEach(function(element) {
    element.addEventListener('click', function() {
        document.querySelector('.modal-request').classList.remove('active');
    });
});

document.querySelectorAll('.questions').forEach(function(element) {
    element.addEventListener('click', function() {
        document.querySelector('.modal-questions').classList.toggle('active');
    });
});

document.querySelectorAll('.modal_area').forEach(function(element) {
    element.addEventListener('click', function() {
        document.querySelector('.modal-questions').classList.remove('active');
    });
});

document.querySelectorAll('.modal_close').forEach(function(element) {
    element.addEventListener('click', function() {
        document.querySelector('.modal-questions').classList.remove('active');
    });
});

document.querySelectorAll('.reviews').forEach(function(element) {
    element.addEventListener('click', function() {
        document.querySelector('.modal-reviews').classList.toggle('active');
    });
});

document.querySelectorAll('.modal_area').forEach(function(element) {
    element.addEventListener('click', function() {
        document.querySelector('.modal-reviews').classList.remove('active');
    });
});

document.querySelectorAll('.modal_close').forEach(function(element) {
    element.addEventListener('click', function() {
        document.querySelector('.modal-reviews').classList.remove('active');
    });
});
document.querySelectorAll('.measurement').forEach(function(element) {
    element.addEventListener('click', function() {
        document.querySelector('.modal-measurement').classList.toggle('active');
    });
});

document.querySelectorAll('.modal_area').forEach(function(element) {
    element.addEventListener('click', function() {
        document.querySelector('.modal-measurement').classList.remove('active');
    });
});

document.querySelectorAll('.modal_close').forEach(function(element) {
    element.addEventListener('click', function() {
        document.querySelector('.modal-measurement').classList.remove('active');
    });
});


document.addEventListener('DOMContentLoaded', function() {
    // Открывать/закрывать меню при клике на бургер
    const burger = document.querySelectorAll('.navbar-burger');
    const menu = document.querySelectorAll('.navbar-menu');

    burger.forEach(function(burgerElement, index) {
        burgerElement.addEventListener('click', function() {
            menu[index].classList.toggle('hidden');
        });
    });

    // Закрывать меню при клике на крестик или фон
    const close = document.querySelectorAll('.navbar-close');
    const backdrop = document.querySelectorAll('.navbar-backdrop');

    function toggleMenu() {
        menu.forEach(function(menuElement) {
            menuElement.classList.toggle('hidden');
        });
    }

    close.forEach(function(closeElement) {
        closeElement.addEventListener('click', toggleMenu);
    });

    backdrop.forEach(function(backdropElement) {
        backdropElement.addEventListener('click', toggleMenu);
    });
});

// анимация при прокрутке до блока
function onEntry(entry) {
    entry.forEach(change => {
        if (change.isIntersecting) {
            change.target.classList.add('element-show');
        } /*else {
            change.target.classList.remove('element-show');
        }*/
    });
}
let options = { threshold: [0.5] };
let observer = new IntersectionObserver(onEntry, options);
let elements = document.querySelectorAll('.element-animation');
for (let elm of elements) {
    observer.observe(elm);
}

// слайдер
var slider1 = new Swiper('.reviews-slider',{
    navigation: {
        nextEl: '.reviews-next',
        prevEl: '.reviews-prev',
    },
    pagination: {
        el: '.reviews-pagination',
        clickable: true,
        dynamicBullets: true,
        renderBullet: function (index, className) {
            return '<span class="' + className + '">' + (index + 1) + '</span>';
        },
    },
    // scrollbar: {
    //     el: '.reviews-scrollbar',
    //     draggable: true,
    // },
    autoHeight: true,
    slidesPerView: 1,
    watchOverflow: true,
    spaceBetween: 35,
    loop: true,

});
var slider2 = new Swiper('.video-slider',{
    navigation: {
        nextEl: '.video-next',
        prevEl: '.video-prev',
    },
    pagination: {
        el: '.video-pagination',
        clickable: true,
        dynamicBullets: true,
        renderBullet: function (index, className) {
            return '<span class="' + className + '">' + (index + 1) + '</span>';
        },
    },
    scrollbar: {
        el: '.video-scrollbar',
        draggable: true,
    },
    autoHeight: true,
    slidesPerView: 2,
    breakpoints: {
        // when window width is <= 320px
        320: {
            slidesPerView: 1,
            spaceBetween: 15
        },

        // when window width is <= 640px
        640: {
            slidesPerView: 2,
            spaceBetween: 35
        }
    },
    watchOverflow: true,
    spaceBetween: 35,
    loop: false,

});


// Прикрепление файла
// Считываем нужные элементы
const file = document.querySelector("#file");
const fileName = document.querySelector("#file_name");
const fileBtnClose = document.querySelector("#file_btn_close");
// Задаем максимальный размер файла 20 Мб
const maxSize = 20 * 1024 * 1024;

// При загрузки файла - вызываем функцию проверки файла
file.addEventListener("change", (e) => {
    checkFile(file.files[0]);
});

// Обработчик кнопки удаления файла
fileBtnClose.addEventListener("click", (e) => {
    e.preventDefault();
    fileReset();
});

// Функция проверки файла
function checkFile(file) {
    // проверяем тип файла
    if (
        ![
            "image/jpeg",
            "image/jpg",
            "image/png",
            "image/gif",
            "image/svg+xml",
        ].includes(file.type)
    ) {
        alert("Разрешены только указанные форматы");
        fileReset();
        return;
    }

    // проверяем размер файла (<20 Мб)
    if (file.size > maxSize) {
        alert("Файл должен быть менее 20 Мб");
        fileReset();
        return;
    }
    showFileName(file);
}

// Сброс полей поля файла
function fileReset() {
    file.value = ""; // удаляем сам файл
    fileName.textContent = ""; // удаляем имя файла
    fileBtnClose.textContent = ""; // убираем кнопку удаления
}

// Выводим имя файла и кнопку удаления
function showFileName(file) {
    fileName.textContent = file.name;
    fileBtnClose.textContent = "×";
}

$(document).ready(function(){
    jQuery("a.colorbox-main").colorbox();
});
// Адаптивный ColorBox

jQuery.colorbox.settings.maxWidth = '95%';
jQuery.colorbox.settings.maxHeight = '95%';

/*
Функция ресайза ColorBox
*/

var resizeTimer;
function resizeColorBox() {
    if (resizeTimer) clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
        if (jQuery('#cboxOverlay').is(':visible')) {
            jQuery.colorbox.load(true);
        }
    }, 300);
}

