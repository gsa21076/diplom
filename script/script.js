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


  // calc
  const calc = () => {

    const accordion = document.getElementById('accordion'),
      panelDefault = accordion.querySelectorAll('.panel-default'),
      panelCollapse = accordion.querySelectorAll('.panel-collapse'),
      boxNumber = document.getElementById('myonoffswitch'),
      haveButtom = document.getElementById('myonoffswitch-two'),
      calcResult = document.getElementById('calc-result'),
      boxTwo = accordion.querySelector('.box-two'),
      distanse = accordion.querySelector('.distanse'),
      firstDiam = accordion.querySelector('.first-diam'),
      firstNumber = accordion.querySelector('.first-number'),
      secondDiam = accordion.querySelector('.second-diam'),
      secondNumber = accordion.querySelector('.second-number');

    let customOrder = {
      numberBox: 1,
      diam1: 1.4,
      number1: 1,
      diam2: 1.4,
      number2: 1,
      bottom: false,
      distanse: 1
    },
      sum = 0,
      k1 = 0,
      k2 = 0,
      k3 = 0,
      k4 = 0;


    const oneCamera = 10000,
      twoCamera = 5000;
    boxTwo.style.display = 'none';

    const boxChange = () => {
      if (boxNumber.checked) {
        boxNumber.checked = false;
        customOrder.numberBox = 2;
        boxTwo.style.display = 'block';

      } else {
        boxNumber.checked = true;
        customOrder.numberBox = 1;
        boxTwo.style.display = 'none';
      }

    };


    const boxControlChange = (target) => {
      if (firstDiam.value === '1.4 метра') {
        customOrder.diam1 = 1.4;
        k1 = 0;
      }
      if (firstDiam.value === '2 метра') {
        customOrder.diam1 = 2;
        k1 = 0.2;
      }
      if (firstNumber.value === '1 штука') {
        customOrder.number1 = 1;
        k2 = 0;
      }
      if (firstNumber.value === '2 штуки') {
        customOrder.number1 = 2;
        k2 = 0.3;
      }
      if (firstNumber.value === '3 штуки') {
        customOrder.number1 = 3;
        k2 = 0.5;
      }
      if (secondDiam.value === '1.4 метра') {
        customOrder.diam2 = 1.4;
        k3 = 0;
      }
      if (secondDiam.value === '2 метра') {
        customOrder.diam2 = 2;
        k3 = 0.2;
      }
      if (secondNumber.value === '1 штука') {
        customOrder.number2 = 1;
        k4 = 0;
      }
      if (secondNumber.value === '2 штуки') {
        customOrder.number2 = 2;
        k4 = 0.2;
      }
      if (secondNumber.value === '3 штуки') {
        customOrder.number2 = 3;
        k4 = 0.4;
      }
    };


    const bottomControlChange = () => {
      console.log(haveButtom.checked);
      if (!haveButtom.checked) {
        haveButtom.checked = true;
        customOrder.bottom = true;
      } else {
        haveButtom.checked = false;
        customOrder.bottom = false;

      }
    };

    const distanseChange = () => {
      distanse.addEventListener('input', () => {
        customOrder.distanse = distanse.value;

      });
    };

    const countSum = () => {
      let sum = 0;
      if (customOrder.numberBox === 1) {
        sum = oneCamera + oneCamera * k1 + oneCamera * k2;
      }
      if (customOrder.numberBox === 2) {
        sum = oneCamera + oneCamera * k1 + oneCamera * k2 + twoCamera + twoCamera * k3 + twoCamera * k4;
      }
      if (customOrder.bottom) {
        if (customOrder.numberBox === 1) {
          sum = sum + sum * 0.1;
        } else {
          sum = sum + sum * 0.2;
        }

      }
      calcResult.textContent = sum;
    };

    const togglePanel = (index) => {
      for (let i = 0; i < panelCollapse.length; i++) {
        if (index === i) {
          panelCollapse[i].classList.add('in');

        } else {
          panelCollapse[i].classList.remove('in');
        }
      }
    };

    accordion.addEventListener('click', (event) => {
      event.preventDefault();
      let target = event.target;
      if (target.closest('.panel-one')) {
        if (target.closest('.onoffswitch')) {
          boxChange();
        }
      }
      if (target.closest('.panel-two')) {
        if (target.closest('.form-control')) {
          boxControlChange(target);
        }
      }
      if (target.closest('.panel-three')) {
        if (target.closest('.onoffswitch-two')) {
          bottomControlChange();
        }
      }
      if (target.closest('.panel-four')) {
        if (target.closest('.distanse')) {
          distanseChange();
        }
      }

      if (target.closest('.construct-btn')) {
        if (target.closest('.call-btn')) {
          console.log(customOrder);
        }
        panelDefault.forEach((item, i) => {
          if (item === target.closest('.panel-default')) {
            i++;
            togglePanel(i);
          }
        });
      } else {
        target = target.closest('.panel-default');
        if (target.classList.contains('panel-default')) {
          panelDefault.forEach((item, i) => {
            if (item === target) {
              togglePanel(i);
            }
          });
        }
      }
      countSum();
    });

  };
  calc();





  // addSentenc
  const addSentenc = () => {
    const addSentenceBtn = document.querySelector('.add-sentence-btn'),
      sentence = document.querySelector('.sentence'),
      shadowBlock = sentence.querySelectorAll('.shadow-block'),
      hidden = sentence.querySelectorAll('.hidden'),
      visibleBlock = sentence.querySelector('.visible-sm-block');


    addSentenceBtn.addEventListener('click', () => {
      hidden.forEach((elem) => {
        visibleBlock.classList.remove('visible-sm-block');
        elem.classList.remove('hidden');
        addSentenceBtn.style.display = 'none';
      });
    });

  };
  addSentenc();

});

