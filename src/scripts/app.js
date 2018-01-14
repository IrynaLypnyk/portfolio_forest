'use strict';

const preloader = require('./components/preloader');
const flipper = require('./components/flipper');
const map = require('./components/map');
const burgerMenu = require('./components/burger-menu');
const arrows = require('./components/arrows');
const blogNav = require('./components/blog');
const slider = require('./components/slider');
const skills = require('./components/skills');
const submitForm = require('./components/contact-form');


//pages
const welcomepage = document.getElementById('welcome');
const aboutpage = document.getElementById('about');
const workspage = document.getElementById('my-works');
const blog = document.getElementById('blog');

preloader(); //прелоадер

if(welcomepage){
  flipper(); //флиппер
}

if(!welcomepage){
  burgerMenu(); //гамбургер меню в хедере
}

if(aboutpage){
  arrows(); //навигационные стрелки вверх-вниз
  skills; // круги со скиллами
  //google.maps.event.addDomListener(window, 'load', map.init);
  map.init();
}

if(workspage){
  arrows();//навигационные стрелки вверх-вниз
  slider();//слайдер
  submitForm();//отправляем форму
}

if(blog) {
  blogNav();
}

