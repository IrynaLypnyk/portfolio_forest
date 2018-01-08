'use strict';

const $ = require('jquery');
const preloader = require('./components/preloader');
const flipper = require('./components/flipper');
const map = require('./components/map');
const burgerMenu = require('./components/burger-menu');
const arrows = require('./components/arrows');
const blogNav = require('./components/blog');


if (document.images.length > 0) {
  preloader();

} else {
  document.getElementById('js-preloader').classList.add('done');
  document.body.style.overflow = 'auto';
}

//blog-menu
if (document.getElementsByClassName('blog-nav__items').length > 0) {
  blogNav();
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

const arrowBtn = document.getElementsByClassName('header__arrow-btn');
if (arrowBtn) {
  arrows();
}

//const blogSidebar = document.getElementById('blog__sidebar');
//if (blogSidebar) {
//  blogNav();
//}

//googlemap
const mapContainer = document.getElementById('map');
if (mapContainer) {
  google.maps.event.addDomListener(window, 'load', map.init);
}