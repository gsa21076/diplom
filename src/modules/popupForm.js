const popupForm = () => {
  const popupCall = document.querySelector('.popup-call'),
    popupConsultation = document.querySelector('.popup-consultation'),
    popupCheck = document.querySelector('.popup-check'),
    popupDiscount = document.querySelector('.popup-discount'),
    popup = document.querySelectorAll('.popup'),
    popupBtn = document.querySelectorAll('.btn'),
    popupClose = document.querySelectorAll('.popup-close'),
    inputName = document.querySelectorAll('input[name=user_name]'),
    userQuest = document.querySelector('input[name=user_quest]'),
    inputPhone = document.querySelectorAll('.phone-user');


  popupBtn.forEach((elem) => {

    elem.addEventListener('click', (event) => {
      event.preventDefault();
      let target = event.target;
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
  });

  popup.forEach((elem) => {
    elem.addEventListener('click', (event) => {
      let target = event.target;
      if (target.classList.contains('popup-close')) {
        elem.style.display = 'none';
      } else {
        target = target.closest('.popup-content');
        if (!target) {
          elem.style.display = 'none';
        }
      }
    });
  });
};

export default popupForm;