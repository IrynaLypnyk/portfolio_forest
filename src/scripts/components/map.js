/*global google*/

let map = (function(){
  let init = function(){
    let map = new google.maps.Map(document.getElementById('map'), {
      zoom: 14,
      center: {lat: 50.4561854, lng: 30.5434603},
      scrollwheel: false,
      mapTypeControl: true,
      mapTypeControlOptions: {
        style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
        position: google.maps.ControlPosition.TOP_LEFT
      },
      zoomControl: true,
      zoomControlOptions: {
        position: google.maps.ControlPosition.RIGHT_CENTER
      },
      scaleControl: true,
      streetViewControl: true,
      streetViewControlOptions: {
        position: google.maps.ControlPosition.RIGHT_CENTER
      },
      fullscreenControl: true,
      styles: [
        {
          'featureType': 'administrative',
          'elementType': 'labels.text.fill',
          'stylers': [{'color': '#444444'}],
        },
        {
          'featureType': 'administrative.country',
          'elementType': 'geometry.fill',
          'stylers': [{'visibility': 'off'}],
        },
        {
          'featureType': 'landscape',
          'elementType': 'all',
          'stylers': [{'color': '#f2f2f2'}],
        },
        {
          'featureType': 'poi',
          'elementType': 'all',
          'stylers': [{'visibility': 'off'}],
        },
        {
          'featureType': 'road',
          'elementType': 'all',
          'stylers': [{'saturation': -100},{'lightness': 45}],
        },
        {
          'featureType': 'road.highway',
          'elementType': 'all',
          'stylers': [{'visibility': 'simplified'}],
        },
        {
          'featureType': 'road.arterial',
          'elementType': 'labels.icon',
          'stylers': [{'visibility': 'off'}],
        },
        {
          'featureType': 'transit',
          'elementType': 'all',
          'stylers': [{'visibility': 'off'}],
        },
        {
          'featureType': 'water',
          'elementType': 'all',
          'stylers': [{'color': '#6c9c5a'},{'visibility': 'on'}],
        },
      ],
    });

    let markerpic = {
      url: './assets/images/decor/map-marker.png',
      size: new google.maps.Size(42, 56),
      origin: new google.maps.Point(0, 0),
      // The anchor for this image is the base of the flagpole at (0, 32).
      anchor: new google.maps.Point(0, 0),
      // scaledSize: new google.maps.Size(30, 45),
    };

    //let infowindow = new google.maps.InfoWindow();

    let marker = new google.maps.Marker({
      position: {lat: 50.4679387, lng: 30.5028748},
      icon: markerpic,
      map: map,
      animation: google.maps.Animation.DROP,
      title:'Контрактовая площадь',
    });

    marker.addListener('click', function(){
      // infowindow.setContent('ул Петра Сагайдачного, 25Б');
      // infowindow.open(map, marker);
      marker.setAnimation(google.maps.Animation.BOUNCE);
      setTimeout(function() {
        marker.setAnimation(null);
      }, 2100);
    });
  };

  return{
    init: init,
  };
})();

module.exports = map;