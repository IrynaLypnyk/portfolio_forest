var $ = require('jquery');

module.exports = function(){
  var showSidebar = (function () {

    var trigger = $('.blog__col_left:after'),
      sidebar = $('.blog-nav__items'),
      windowWidth = Math.ceil($(window).width() * 0.9);

    $(document).ready(function(){
      $('.article').click(function(){
        $('blog__col_left').animate({
          width: '90%'});
      });
    });

  }());
  console.log('i am in blog')
  showSidebar;
};