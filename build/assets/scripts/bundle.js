!function(e){function t(n){if(o[n])return o[n].exports;var l=o[n]={i:n,l:!1,exports:{}};return e[n].call(l.exports,l,l.exports,t),l.l=!0,l.exports}var o={};t.m=e,t.c=o,t.d=function(e,o,n){t.o(e,o)||Object.defineProperty(e,o,{configurable:!1,enumerable:!0,get:n})},t.n=function(e){var o=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(o,"a",o),o},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=0)}([function(e,t,o){const n=o(1),l=o(2),i=o(3),r=o(4);document.images.length>0?n():(document.getElementById("js-preloader").classList.add("done"),document.body.style.overflow="auto");document.querySelector(".welcome__flipper")&&l();document.getElementById("burger-menu")&&r();document.getElementById("map")&&i.event.addDomListener(window,"load",i.init)},function(e,t){e.exports=function(){function e(){document.body.style.overflow="hidden",n++,l.innerHTML=Math.ceil(100/o*n),n>=o&&setTimeout(function(){i.classList.contains("done")||(i.classList.add("done"),document.body.style.overflow="auto")},1e3)}for(var t=document.images,o=t.length,n=0,l=document.getElementById("js-load-percent"),i=document.getElementById("js-preloader"),r=0;r<o;r++)imageClone=new Image,imageClone.onload=e,imageClone.onerror=e,imageClone.src=t[r].src}},function(e,t){e.exports=function(){function e(){o.style.visibility="hidden",n.style.transform="rotateY(180deg)"}function t(e){e.preventDefault(),n.style.transform="rotateY(0deg)",o.style.visibility="visible"}var o=document.querySelector(".auth-btn"),n=document.querySelector(".welcome__flipper"),l=document.querySelector(".nav-btns__link_to-main-page");return o&&o.addEventListener("click",e),void(l&&l.addEventListener("click",t))}},function(e,t){let o={init:function(){let e=new google.maps.Map(document.getElementById("map"),{zoom:14,center:{lat:50.4561854,lng:30.5434603},scrollwheel:!1,mapTypeControl:!0,mapTypeControlOptions:{style:google.maps.MapTypeControlStyle.HORIZONTAL_BAR,position:google.maps.ControlPosition.TOP_LEFT},zoomControl:!0,zoomControlOptions:{position:google.maps.ControlPosition.RIGHT_CENTER},scaleControl:!0,streetViewControl:!0,streetViewControlOptions:{position:google.maps.ControlPosition.RIGHT_CENTER},fullscreenControl:!0,styles:[{featureType:"administrative",elementType:"labels.text.fill",stylers:[{color:"#444444"}]},{featureType:"administrative.country",elementType:"geometry.fill",stylers:[{visibility:"off"}]},{featureType:"landscape",elementType:"all",stylers:[{color:"#f2f2f2"}]},{featureType:"poi",elementType:"all",stylers:[{visibility:"off"}]},{featureType:"road",elementType:"all",stylers:[{saturation:-100},{lightness:45}]},{featureType:"road.highway",elementType:"all",stylers:[{visibility:"simplified"}]},{featureType:"road.arterial",elementType:"labels.icon",stylers:[{visibility:"off"}]},{featureType:"transit",elementType:"all",stylers:[{visibility:"off"}]},{featureType:"water",elementType:"all",stylers:[{color:"#6c9c5a"},{visibility:"on"}]}]}),t={url:"./assets/images/decor/map-marker.png",size:new google.maps.Size(42,56),origin:new google.maps.Point(0,0),anchor:new google.maps.Point(0,0)},o=new google.maps.Marker({position:{lat:50.4679387,lng:30.5028748},icon:t,map:e,animation:google.maps.Animation.DROP,title:"Контрактовая площадь"});o.addListener("click",function(){o.setAnimation(google.maps.Animation.BOUNCE),setTimeout(function(){o.setAnimation(null)},2100)})}};e.exports=o},function(e,t){e.exports=function(){function e(){n.classList.toggle("active"),o.forEach(function(e){e.classList.toggle("active")})}var t=document.querySelector(".burger-menu__icon"),o=document.querySelectorAll(".burger-menu__line"),n=document.querySelector(".burger-menu__list");return void t.addEventListener("click",e)}}]);