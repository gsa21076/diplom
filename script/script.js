window.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // popup-call
  function popupCall() {
    const callBtn = document.querySelectorAll('a[class=call-btn]'),
      popupCall = document.querySelector('.popup-call');
    callBtn.forEach((elem) => {
      elem.addEventListener('click', () => {
        popupCall.style.display = 'block';
      });
      popupCall.addEventListener('click', (event) => {
        let target = event.target;
        if (target.classList.contains('popup-close')) {
          popupCall.style.display = 'none';
        } else {
          target = target.closest('.popup-dialog');
          if (!target) {
            popupCall.style.display = 'none';
          }
        }
      });
    });
  }
  popupCall();


  // popup-discount
  function popupDiscount() {
    const discountBtn = document.querySelectorAll('.discount-btn'),
      popupDiscount = document.querySelector('.popup-discount');
    discountBtn.forEach((elem) => {
      elem.addEventListener('click', () => {
        popupDiscount.style.display = 'block';
      });
      popupDiscount.addEventListener('click', (event) => {
        let target = event.target;
        if (target.classList.contains('popup-close')) {
          popupDiscount.style.display = 'none';
        } else {
          target = target.closest('.popup-dialog');
          if (!target) {
            popupDiscount.style.display = 'none';
          }
        }
      });
    });
  }

  popupDiscount();




});