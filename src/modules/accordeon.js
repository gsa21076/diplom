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

export default accordeon;