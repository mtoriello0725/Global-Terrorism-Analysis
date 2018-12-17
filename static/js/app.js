var myMap = L.map("geoMap", {
  center: [31, 65],
  zoom: 0
});


// Adding tile layer to the map
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 6,
  id: "mapbox.streets",
  accessToken: API_KEY
}).addTo(myMap);

function globalTerrorismMap() {

	URL = "/api/geography";
	d3.json(URL).then(function(response) {

		// define geoData as the response
		console.log(response);

		// // assign markers to cluster group
		// var markers = L.markerClusterGroup();

		// for (var i=0; i < 10; i++) {

		// 	var lat = geoData[i].latitude;
		// 	var long = geoData[i].longitude;

		// 	if (lat&long) {
		// 		markers.addLayer(L.marker([lat, long])).bindPopup(geoData[i].city)
		// 	}
		// }

		// myMap.addLayer(markers);

	});
}

globalTerrorismMap()