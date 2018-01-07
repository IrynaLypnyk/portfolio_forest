const preloader = require('./components/preloader');
const flipper = require('./components/flipper.js');
const map = require('./components/map.js');
const burgerMenu = require('./components/burger-menu.js');
//const $ = require('jquery');

// const body = document.querySelector('body');
// if(body){
//   console.log('body loaded');
//   body.addEventListener('load', toPreload());
// }

if (document.images.length > 0) {
  preloader();

} else {
  document.getElementById('js-preloader').classList.add('done');
  document.body.style.overflow = 'auto';
}

//flipper
const flipperId=document.querySelector('.welcome__flipper');
if(flipperId){
  flipper();
}

//burger
const burgerId = document.getElementById('burger-menu');
if (burgerId) {
  burgerMenu();
}

//googlemap
const mapContainer = document.getElementById('map');
if (mapContainer) {
  map.event.addDomListener(window, 'load', map.init);
}


