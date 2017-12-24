const flipper = require('./components/flipper.js');
const map = require('./components/map.js');
const $ = require('jquery');
// import {map} from './components/map.js';

const mapContainer = document.getElementById('map');
const welcomeFlip = document.getElementById('flipper');


if (mapContainer) {
  google.maps.event.addDomListener(window, 'load', map.init);
}


