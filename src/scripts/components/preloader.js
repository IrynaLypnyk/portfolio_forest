module.exports = function () {

  function preloader() {
    var images = document.images,
      imagesTotalCount = images.length,
      imagesLoadedCount = 0,
      persDisplay = document.getElementById('js-load-percent'),
      preloader = document.getElementById('js-preloader'),
      percent = 0;

    for (var i = 0; i < imagesTotalCount; i++) {
      var imageClone = new Image();
      imageClone.onload = imageLoaded;
      imageClone.onerror = imageLoaded;
      imageClone.src = images[i].src;
    }

    function imageLoaded() {
      document.body.style.overflow = 'hidden';
      imagesLoadedCount++;
      percent = Math.ceil((100 / imagesTotalCount) * imagesLoadedCount);
      persDisplay.innerHTML = percent + '%';
      console.log('in procentCount()' + percent + '%');

      if (imagesLoadedCount >= imagesTotalCount) {

        setTimeout(function () {
          if (!preloader.classList.contains('done')) {
            preloader.classList.add('done');
            document.body.style.overflow = 'auto';
          }

        }, 1500);
      }
    }
  }
  document.addEventListener('DOMContentLoaded', preloader);
};


