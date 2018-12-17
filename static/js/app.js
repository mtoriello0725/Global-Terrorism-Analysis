var myMap = L.map("geoMap", {
  center: [31, 65],
  zoom: 2
});


// Adding tile layer to the map
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 8,
  id: "mapbox.streets",
  accessToken: API_KEY
}).addTo(myMap);

function globalTerrorismMap() {

	URL = "/api/geography";
	d3.json(URL, function(response) {

		var markers = L.markerClusterGroup();

		var geoJsonLayer = L.geoJson(response, {
			onEachFeature: function(feature, layer) {
				layer.bindPopup(feature.properties.target_type);
				layer.on("mouseover", function(e) {
					this.openPopup();
				});
				layer.on("mouseout", function(e) {
					this.closePopup();
				});
			}
		});

		markers.addLayer(geoJsonLayer);

		myMap.addLayer(markers);
		myMap.fitBounds(markers.getBounds());
	});
}

globalTerrorismMap()