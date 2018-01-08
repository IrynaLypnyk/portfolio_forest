var $ = require('jquery');

module.exports = function(){
  var animateSidebar = (function () {

    var articles = $('.blog-articles__item'),
      titles = $('.blog-nav__items'),
      windowMargin = Math.ceil($(window).height() / 2);

    var activeAdd = function (Eq) {
      articles.eq(Eq).addClass('active')
        .siblings().removeClass('active');

      titles.eq(Eq).addClass('active')
        .siblings().removeClass('active');
    };

    activeAdd(0);

    var checkDistance = function (scrollTop, elem) {
      var offset = elem.offset().top;
      var topBorder = offset - scrollTop - windowMargin;
      var midEdge = elem.outerHeight(true) + offset;
      var midBorder = scrollTop + windowMargin - midEdge;

      return topBorder <=0 && midBorder <= 0;

    };

    var defineArticle = function (articles) {
      var activeArticle = articles.filter('.active');
      return {
        activeArticle: activeArticle,
        nextArticle: activeArticle.next(),
        prevArticle: activeArticle.prev(),
      };
    };

    return {
      init: function () {

        $(window).on('scroll', function () {
          var scrollTop = $(window).scrollTop();
          var article = defineArticle(articles);
          var fixedPosition = $('.blog-articles').offset().top;

          if (scrollTop >= fixedPosition) {
            $('#blog__sidebar').addClass('fixed');
          } else {
            $('#blog__sidebar').removeClass('fixed');
          }

          if (article.nextArticle.length) {
            if (checkDistance(scrollTop, article.nextArticle)) {
              newEq = article.nextArticle.index();
              activeAdd(newEq);
            }

          }

          if (article.prevArticle.length) {
            if (checkDistance(scrollTop, article.prevArticle)) {
              newEq = article.prevArticle.index();
              activeAdd(newEq);
            }

          }
        });

        titles.on('click', function(e) {
          e.preventDefault();
          var elem = $(e.target).parent(),
            showEq = elem.index();

          articles.eq(showEq).addClass('active')
            .siblings().removeClass('active');

          var activeArticle = articles.filter('.active');
          var target = activeArticle.offset().top;
          $('html, body').animate({
            scrollTop : target,
          }, 700);

        });
      },
    };
  }());
  animateSidebar.init();
};