module.exports = function () {

  var blogNavBtn = document.querySelector('.blog-nav-hidden__trigger');
  var blogNavList = document.querySelector('#blog-nav_hidden');

  //
  function addClassActive() {
    blogNavList.classList.toggle('active');
  }

  //
  function toShowHideNav() {
    blogNavBtn.addEventListener('click', addClassActive);
  }
  //
  return toShowHideNav();
};