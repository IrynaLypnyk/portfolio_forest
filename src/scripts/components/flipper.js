var btn=document.querySelector('.auth-btn');
var flipper=document.querySelector('.welcome__flipper');
var toMainPageBtn=document.querySelector('.nav-btns__link_to-main-page');

function toAuthForm(){
  btn.style.visibility = 'hidden';
  flipper.style.transform = 'rotateY(180deg)';
}

function toMainPage(e){
  e.preventDefault();
  flipper.style.transform = 'rotateY(0deg)';
  btn.style.visibility = 'visible';
}

function toFlip(){
  if(btn){
    btn.addEventListener('click', toAuthForm);
  }
  if(toMainPageBtn){
    toMainPageBtn.addEventListener('click', toMainPage);
  }
}

module.exports = toFlip();