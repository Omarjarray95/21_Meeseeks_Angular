
mapboxgl.accessToken = 'pk.eyJ1IjoicHJvbWV0aGV1czI1MTIiLCJhIjoiY2pvb2NkOWNhMWgyMjN3bHNwdjFndnNlMiJ9.JZ-jhyOhjRv8HkM4Q9LOYw';
var map = new mapboxgl.Map({
    container: 'map', // container id
	maxBounds: [[-180,-60],[180,80]],
    style: 'mapbox://styles/mapbox/light-v9', // stylesheet location
    center: [-74.50, 40], // starting position [lng, lat]
    zoom: 0 // starting zoom
	
	
});
var geocoder = new MapboxGeocoder({
    accessToken: mapboxgl.accessToken
});

document.getElementById('geocoder').appendChild(geocoder.onAdd(map));
geocoder.on('result', function(ev) {
       console.log(ev['result']['place_name']);
    });