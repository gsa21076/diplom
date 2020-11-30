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

export default addSentenc;