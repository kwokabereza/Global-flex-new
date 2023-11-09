// import IMask from 'imask';
// // Считываем поле ввода
// let phoneInput = document.querySelector(".phone");
// // Считываем кнопку
// let btn = document.querySelector(".sendMail");
//
// // Создаем маску в инпуте
// const phoneMask = new IMask(phoneInput, {
//     mask: "+{7}(000)000-00-00",
// });
//
// // Обработчик события для инпута
// phoneInput.addEventListener("input", phoneInputHandler);
// // Обработчик события для кнопки
// btn.addEventListener("click", btnHandler);
//
// // Если ввели правлильно - кнопка активна
// function phoneInputHandler() {
//     if (phoneMask.masked.isComplete) {
//         btn.classList.add("btn--active");
//     } else {
//         btn.classList.remove("btn--active");
//     }
// }
//
// // Отправляем номер телефона
// async function btnHandler(e) {
//     e.preventDefault();
//     return await fetch("send_msg.php", {
//         method: "POST",
//         body: phoneMask.unmaskedValue,
//     });
// }
