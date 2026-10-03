module.exports = function () {
  var btn = document.querySelector('.auth-btn');
  var flipper = document.querySelector('.welcome__flipper');
  var toMainPageBtn = document.querySelector('.form__goto-btn_auth-form');

  document.getElementById('auth-form')?.addEventListener('submit', event => {
    event.preventDefault();
    alert('This is a demo form. Authentication is not connected.');
  });

  function toAuthForm() {
    btn.style.visibility = 'hidden';
    flipper.style.transform = 'rotateY(180deg)';
  }

  function toMainPage(e) {
    e.preventDefault();
    flipper.style.transform = 'rotateY(0deg)';
    btn.style.visibility = 'visible';
  }

  function toFlip() {
    if (btn) {
      btn.addEventListener('click', toAuthForm);
    }
    if (toMainPageBtn) {
      toMainPageBtn.addEventListener('click', toMainPage);
    }
  }

  return toFlip();
}

