var $ = require('jquery');

module.exports = function() {
  function ScrollTo(sectionNumber) {
    var target = $('.section').eq(sectionNumber).offset().top;
    $('html, body').animate({
      scrollTop : target,
    },
    1000);
  }

  $(function() {
    $('.header__arrow-btn').on('click', function(e) {
      e.preventDefault();
      ScrollTo(1);
    });
  });

  $(function() {
    $('.my-works__arrow-btn').on('click', function(e) {
      e.preventDefault();
      ScrollTo(0);
    });
  });
};