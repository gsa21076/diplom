window.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // popup-form
  const popupForm = () => {
    const popupCall = document.querySelector('.popup-call'),
      popupConsultation = document.querySelector('.popup-consultation'),
      popupCheck = document.querySelector('.popup-check'),
      popupDiscount = document.querySelector('.popup-discount'),
      popup = document.querySelectorAll('.popup'),
      btn = document.querySelectorAll('.btn'),
      popupClose = document.querySelectorAll('.popup-close');


    btn.forEach((elem) => {

      elem.addEventListener('click', (event) => {
        let target = event.target;
        console.log(target);
        if (target.classList.contains('call-btn')) {
          popupCall.style.display = 'block';
        }
        if (target.classList.contains('discount-btn')) {
          popupDiscount.style.display = 'block';
        }
        if (target.classList.contains('check-btn')) {
          popupCheck.style.display = 'block';
        }
        if (target.classList.contains('director-btn')) {
          popupConsultation.style.display = 'block';
        }


      });
      popup.forEach((elem) => {
        elem.addEventListener('click', (event) => {
          let target = event.target;
          if (target.classList.contains('popup-close')) {
            elem.style.display = 'none';
          } else {
            target = target.closest('.popup-dialog');
            if (!target) {
              elem.style.display = 'none';
            }
          }
        });
      });

    });
  };
  popupForm();



  // // send-ajax-form
  // const sendForm = () => {
  //   const errorMessage = 'Что-то пошло не так...',
  //     loadMessage = 'Загрузка...',
  //     successMessage = 'Спасибо! Мы скоро с Вами свяжемся.';



  // };
  // sendForm();


});