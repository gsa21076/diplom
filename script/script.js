window.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // popup-form
  const popupForm = () => {
    const popupCall = document.querySelector('.popup-call'),
      popupConsultation = document.querySelector('.popup-consultation'),
      popupCheck = document.querySelector('.popup-check'),
      popupDiscount = document.querySelector('.popup-discount'),
      popup = document.querySelectorAll('.popup'),
      popupBtn = document.querySelectorAll('.btn'),
      popupClose = document.querySelectorAll('.popup-close'),
      inputName = document.querySelectorAll('input[name=user_name]'),
      inputPhone = document.querySelectorAll('.phone-user');


    popupBtn.forEach((elem) => {

      elem.addEventListener('click', (event) => {
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
          inputName.forEach((elem) => {
            elem.required = false;
          });
          inputPhone.forEach((elem) => {
            elem.required = false;
          });
        } else {
          target = target.closest('.popup-content');
          if (!target) {
            elem.style.display = 'none';
          }
        }
      });


    });
  };
  popupForm();



  // send-ajax-form
  const sendForm = () => {
    const errorMessage = 'Что-то пошло не так...',
      loadMessage = 'Загрузка...',
      successMessage = 'Спасибо! Мы скоро с Вами свяжемся.';

    const form = document.querySelectorAll('form'),
      inputName = document.querySelectorAll('input[name=user_name]'),
      inputPhone = document.querySelectorAll('.phone-user'),
      inputQuest = document.querySelector('input[name=user_quest]');

    const statusMessage = document.createElement('div');
    statusMessage.style.cssText = `font-size: 1,5rem;
    color: black;`;

    const postData = (body) => {
      inputName.forEach(elem => elem.value = '');
      inputPhone.forEach(elem => elem.value = '');
      inputQuest.value = '';

      return fetch('./server.php', {
        metod: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });
    };

    inputPhone.forEach((phone) => {
      phone.addEventListener('input', (event) => {
        event.target.value = event.target.value.replace(/[^\+\-\d(10)-]/g, '');
      });
    });

    inputName.forEach((name) => {
      name.addEventListener('input', (event) => {
        event.target.value = event.target.value.replace(/[^А-яЁё\ \,\.]/g, '');
      });
    });

    inputQuest.addEventListener('input', (event) => {
      event.target.value = event.target.value.replace(/[^А-яЁё\ \, \.]*$/gi, '');
    });

    form.forEach((form) => {
      form.addEventListener('submit', (event) => {
        event.preventDefault();
        form.append(statusMessage);
        statusMessage.textContent = loadMessage;
        const formData1 = new FormData(form);
        console.log(formData1);
        let body = {};
        formData1.forEach((val, key) => {
          console.log(key, val);
          body[key] = val;
        });

        postData(body)
          .then((response) => {
            if (response.status !== 200) {
              throw new Error('status network not 200');
            }
            statusMessage.textContent = successMessage;
          })
          .catch((error) => {
            statusMessage.textContent = errorMessage;
            console.error(error);
          });

      });
    });
  };
  sendForm();




  // panel-accordeon
  const accordeon = () => {

    const panel = document.getElementById('accordion-two'),
      panelHeading = panel.querySelectorAll('.panel-heading'),
      panelCollapse = panel.querySelectorAll('.panel-collapse');

    const togglePanel = (index) => {
      for (let i = 0; i < panelCollapse.length; i++) {
        if (index === i) {
          panelCollapse[i].classList.add('in');

        } else {
          panelCollapse[i].classList.remove('in');
        }
      }
    };

    panel.addEventListener('click', (event) => {
      event.preventDefault();
      let target = event.target;
      target = target.closest('.panel-heading');
      if (target.classList.contains('panel-heading')) {
        panelHeading.forEach((item, i) => {
          if (item === target) {
            togglePanel(i);
          }
        });
      }
    });
  };
  accordeon();

});