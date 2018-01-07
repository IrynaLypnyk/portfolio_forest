const flipper = require('./components/flipper.js');
const map = require('./components/map.js');
const burgermenu = require('./components/burger-menu.js');
const $ = require('jquery');


const mapContainer = document.getElementById('map');
if (mapContainer) {
  google.maps.event.addDomListener(window, 'load', map.init);
}


