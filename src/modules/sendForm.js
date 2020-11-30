const sendForm = () => {
  let customOrder = JSON.parse(sessionStorage.myOrder);

  if (customOrder.useCalc) {
    customOrder = JSON.parse(sessionStorage.myOrder);
    sessionStorage.clear();
  } else {
    customOrder = {
      useCalc: false,
      numberBox: 1,
      diam1: 1.4,
      number1: 1,
      diam2: 1.4,
      number2: 1,
      bottom: false,
      distanse: 0,
      sum: 10000,
      question: ''
    };
  }

  const errorMessage = 'Что-то пошло не так...',
    loadMessage = 'Загрузка...',
    successMessage = 'Спасибо! Мы скоро с Вами свяжемся.';

  const form = document.querySelectorAll('form'),
    userName = document.querySelectorAll('input[name=user_name]'),
    userPhone = document.querySelectorAll('.phone-user'),
    userQuest = document.querySelector('input[name=user_quest]');

  const statusMessage = document.createElement('div');
  statusMessage.style.cssText = `font-size: 1,5rem;
    color: black;`;

  const postData = (user) => {
    userName.forEach(elem => elem.value = '');
    userPhone.forEach(elem => elem.value = '');
    userQuest.value = '';
    return fetch('./server.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    });

  };

  userPhone.forEach((phone) => {
    phone.addEventListener('input', (event) => {
      event.target.value = event.target.value.replace(/[^\+\-\d(10)-]/g, '');
    });
  });

  userName.forEach((name) => {
    name.addEventListener('input', (event) => {
      event.target.value = event.target.value.replace(/[^А-яЁё\ \,\.]/g, '');
    });
  });

  userQuest.addEventListener('input', (event) => {
    event.target.value = event.target.value.replace(/[^А-яЁё\ \, \.]*$/gi, '');
  });

  form.forEach((form) => {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      customOrder.question = userQuest.value;
      const formData = new FormData(form);
      let body = {};
      formData.forEach((val, key) => {
        body[key] = val;
      });
      let user = Object.assign(body, customOrder);

      postData(user)
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
      userQuest.required = false;
    });
  });
};

export default sendForm;