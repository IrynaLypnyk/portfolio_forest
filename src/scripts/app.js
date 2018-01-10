'use strict';

const $ = require('jquery');
const preloader = require('./components/preloader');
const flipper = require('./components/flipper');
const map = require('./components/map');
const burgerMenu = require('./components/burger-menu');
const arrows = require('./components/arrows');
const blogNav = require('./components/blog');
const slider = require('./components/slider');
const skills = require('./components/skills');

//preloader
if (document.images.length > 0) {
  preloader();

} else {
  document.getElementById('js-preloader').classList.add('done');
  // document.body.style.overflow = 'auto';
}

//flipper
const flipperId=document.querySelector('.welcome__flipper');
if(flipperId){
  flipper();
}

//blog-menu
if (document.getElementsByClassName('blog-nav__items').length > 0) {
  blogNav();
}


//burger
const burgerId = document.getElementById('burger-menu');
if (burgerId) {
  burgerMenu();
}
//googlemap
const mapId = document.getElementById('map');
if (mapId) {
  google.maps.event.addDomListener(window, 'load', map.init);
}
const skillsId = document.getElementById('skills');
if (skillsId) {
  skills();
}

const arrowBtn = document.getElementsByClassName('header__arrow-btn');
if (arrowBtn) {
  arrows();
}

const sliderId = document.getElementById('slider');
if (sliderId) {
  slider();
}


