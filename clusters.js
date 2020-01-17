
var leaflet_tiles = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png'),
    CartoDB_DarkMatter = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png');

var map = L.map('map', {
    center: [28.0820, 77.6753],
    zoom: 5,
    layers: [leaflet_tiles, CartoDB_DarkMatter] //,CartoDB_DarkMatter add to load this tile
});

var baseMaps = {
    "CartoDB_DarkMatter": CartoDB_DarkMatter,
    "Leaflet_Tiles": leaflet_tiles
};

L.control.layers(baseMaps).addTo(map);


document.getElementById("fileInput").addEventListener("change", function (evt) {
    var file = evt.target.files[0], // Read only first file.
        reader = new FileReader();

    reader.onload = function (e) {
        var fileText = e.target.result;
        fileData = JSON.parse(fileText);


        myIcon = L.icon({
            iconUrl: 'marker-icon.png',
            iconSize: [38, 95],
            iconAnchor: [22, 94],
            popupAnchor: [-3, -76],
            shadowSize: [68, 95],
            shadowAnchor: [22, 94]
        });

        // var markers = L.markerClusterGroup();
        //dynamically change the markers behaviours
        var markers = L.markerClusterGroup({
            chunkedLoading: true,
            showCoverageOnHover: false,
            zoomToBoundsOnClick: true,
            singleMarkerMode: false,
            spiderfyShapePositions: function (count, centerPt) {
                var distanceFromCenter = 35,
                    markerDistance = 45,
                    lineLength = markerDistance * (count - 1),
                    lineStart = centerPt.y - lineLength / 2,
                    res = [],
                    i;

                res.length = count;

                for (i = count - 1; i >= 0; i--) {
                    res[i] = new Point(centerPt.x + distanceFromCenter, lineStart + markerDistance * i);
                }

                return res;
            }

        });

        mymap = L.geoJson(fileData, {
            pointToLayer: function (feature, latlng) {
                return L.marker(latlng, { icon: myIcon });
            }
        })
        markers.addLayer(mymap);
        markers.addTo(map);
    }
    reader.readAsText(file);
});