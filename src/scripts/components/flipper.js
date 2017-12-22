var btn=document.querySelector('.auth-btn');
var flipper=document.querySelector('.welcome__flipper');
var toMainPageBtn=document.querySelector('.nav-btns__link_to-main-page');

function toAuthForm(){
  btn.onclick = function(){
    btn.style.visibility = 'hidden';
    flipper.style.transform = 'rotateY(180deg)';
  };
}

function toMainPage(){
  toMainPageBtn.onclick = function(e){
    e.preventDefault();
    flipper.style.transform = 'rotateY(0deg)';
    btn.style.visibility = 'visible';
  };
}

module.exports =  toAuthForm();
module.exports =  toMainPage();