
var leaflet_tiles = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png');

var map = L.map('map', {
    center: [25.2744, 133.7751],
    zoom: 4,
    layers: [leaflet_tiles]
});

var mcg = L.markerClusterGroup({
    chunkedLoading: true,
    //singleMarkerMode: true,
    spiderfyOnMaxZoom: false
});

for (var i = 0; i < addressPoints.length; i++) {
    var a = addressPoints[i];
    // console.log(a);
    var title = a[2];
    var marker = L.marker(new L.LatLng(a[0], a[1]), { title: title });
    marker.bindPopup(title);
    mcg.addLayer(marker);
}

map.addLayer(mcg);