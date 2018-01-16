// module.exports = function () {
//
//   var bmButton = document.querySelector('.burger-menu__icon');
//   var bmLine = document.querySelectorAll('.burger-menu__line');
//   var bmList = document.querySelector('.burger-menu__list');
//
//
//   function toggleActiveClass() {
//     bmList.classList.toggle('active');
//     bmLine.forEach(function (el) {
//       el.classList.toggle('active');
//     });
//   }
//
//   function toShowHideMenu() {
//     bmButton.addEventListener('click', toggleActiveClass);
//   }
//
//   return toShowHideMenu();
// };

module.exports = {
  template: '#burger-menu_template',

  props: ['text'],
};