'use strict';

const preloader = require('./components/preloader');
const flipper = require('./components/flipper');
const map = require('./components/map');
const burgerMenu = require('./components/burger-menu');
const arrows = require('./components/arrows');
const blogNav = require('./components/blog');
const slider = require('./components/slider');
require('./components/skills');
const submitForm = require('./components/contact-form');


//pages
const welcomepage = document.getElementById('welcome');
const aboutpage = document.getElementById('about');
const workspage = document.getElementById('my-works');
const blog = document.getElementById('blog');

const waterReady = require('./components/water')();
preloader(waterReady ? [waterReady] : []);

if(welcomepage){
  flipper(); //флиппер
}

if(!welcomepage){
  burgerMenu(); //гамбургер меню в хедере
  arrows();
}

if(aboutpage){
  //google.maps.event.addDomListener(window, 'load', map.init);
  map.init();
}

if(workspage){
  slider();//слайдер
  submitForm();//отправляем форму
}

if(blog) {
  blogNav();
}
