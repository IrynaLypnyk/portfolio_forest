'use strict';

//const $ = require('jquery');
const preloader = require('./components/preloader');
const flipper = require('./components/flipper');
const map = require('./components/map');
const burgerMenu = require('./components/burger-menu');
const arrows = require('./components/arrows');
const blogNav = require('./components/blog');
const blogNavHidden = require('./components/blog-nav-hidden');
const slider = require('./components/slider');
const skills = require('./components/skills');
const submitForm = require('./components/contact-form');
const loginForm = require('./components/login-form');

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
const blogNavHiddenId=document.querySelector('#blog-nav_hidden');
if(blogNavHiddenId){
  blogNavHidden();
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


const arrowBtn = document.getElementsByClassName('header__arrow-btn');
if (arrowBtn) {
  arrows();
}

const sliderId = document.getElementById('slider');
if (sliderId) {
  slider();
}

const skillsId = document.getElementById('skills');
if (skillsId) {
  skills;
}

// const contactFormId = document.getElementById('contact-form');
// if (contactFormId) {
// $('#contact-form').on('submit', testForm);
submitForm();

