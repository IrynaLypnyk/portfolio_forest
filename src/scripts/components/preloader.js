module.exports = function () {

  var images = document.images,
    imagesTotalCount = images.length,
    imagesLoadedCount = 0,
    persDisplay = document.getElementById('js-load-percent'),
    preloader = document.getElementById('js-preloader');

  for ( var i =0; i < imagesTotalCount; i++) {
    imageClone = new Image();
    imageClone.onload = imageLoaded;
    imageClone.onerror = imageLoaded;
    imageClone.src = images[i].src;
  }

  function imageLoaded() {
    document.body.style.overflow = 'hidden';
    imagesLoadedCount++;
    persDisplay.innerHTML = Math.ceil((100 / imagesTotalCount) * imagesLoadedCount);

    if (imagesLoadedCount >= imagesTotalCount) {

      setTimeout(function() {
        if (!preloader.classList.contains('done')) {
          preloader.classList.add('done');
          document.body.style.overflow = 'auto';
        }

      }, 1000);
    }
  }

};



