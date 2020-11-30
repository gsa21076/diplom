'use strict';

import popupForm from './modules/popupForm';
import accordeon from './modules/accordeon';
import calc from './modules/calc';
import sendForm from './modules/sendForm';
import addSentenc from './modules/addSentenc';




let customOrder = {
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
sessionStorage.myOrder = JSON.stringify(customOrder);

// popup-form
popupForm();

// panel-accordeon
accordeon();

// calc
calc();

// send-ajax-form
sendForm();

// addSentenc
addSentenc();
