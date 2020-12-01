const calc = () => {
  let customOrder = JSON.parse(sessionStorage.myOrder);


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
    secondNumber = accordion.querySelector('.second-number'),
    popupDiscount = document.querySelector('.popup-discount');

  let
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
      k1 = 0;
    }
    if (firstDiam.value === '2 метра') {
      customOrder.diam1 = 2;
      k1 = 0.2;
    }
    if (firstNumber.value === '1 штука') {
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
      k3 = 0;
    }
    if (secondDiam.value === '2 метра') {
      customOrder.diam2 = 2;
      k3 = 0.2;
    }
    if (secondNumber.value === '1 штука') {
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
        customOrder.bottom = true;
      } else {
        sum = sum + sum * 0.2;
        customOrder.bottom = true;

      }
    }
    customOrder.sum = sum;
    customOrder.useCalc = true;
    sessionStorage.myOrder = JSON.stringify(customOrder);

    let sumBack = +calcResult.textContent;
    let totalSum = setInterval(updateSum, 1);

    function updateSum() {
      if (sumBack < sum) {
        sumBack += 50;
        calcResult.textContent = sumBack;
        if (sumBack >= sum) {
          calcResult.textContent = sum;
          clearInterval(totalSum);
        }
      }
      if (sumBack > sum) {
        sumBack -= 50;
        calcResult.textContent = sumBack;
        if (sumBack <= sum) {
          calcResult.textContent = sum;
          clearInterval(totalSum);

        }
      }
    }

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
        popupDiscount.style.display = 'block';

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

export default calc;