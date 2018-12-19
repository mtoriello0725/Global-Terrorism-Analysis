function getYearMap(year) {

	URL = "/api/geography/"+year;
	d3.json(URL, function(response) {
		createFeatures(response.features);
	})

	function createFeatures(yearData) {
		var markers = L.markerClusterGroup();

		var geoJsonLayer = L.geoJson(yearData, {
			onEachFeature: function(feature, layer) {
				layer.bindPopup("<strong>Target Type: </strong><p>"+feature.properties.target_type+"</p><br><strong>Attack Type: </strong><p>"+feature.properties.attack_type+"</p>");
				layer.on("mouseover", function(e) {
					this.openPopup();
				});
				layer.on("mouseout", function(e) {
					this.closePopup();
				});
			}
		});

		markers.addLayer(geoJsonLayer);
		createMap(markers);

	}

	function createMap(yearLayer) {

		// Define streetmap and darkmap layers
		var streetmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
		attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
		maxZoom: 8,
		minZoom: 2,
		id: "mapbox.streets",
		accessToken: API_KEY
		});

		var darkmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
		attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
		maxZoom: 8,
		minZoom: 2,
		id: "mapbox.dark",
		accessToken: API_KEY
		});

		// Define a baseMaps object to hold our base layers
		var baseMaps = {
		"Street Map": streetmap,
		"Dark Map": darkmap
		};

		// Create overlay object to hold our overlay layer
		var overlayMaps = {
		Incidents: yearLayer
		};

		// Create our map, giving it the streetmap and earthquakes layers to display on load
		var myMap = L.map("geoMap", {
		center: [31, 65],
		zoom: 2,
		layers: [streetmap, yearLayer]
		});

		// Create a layer control
		// Pass in our baseMaps and overlayMaps
		// Add the layer control to the map
		L.control.layers(baseMaps, overlayMaps, {position: "topleft"}).addTo(myMap);
	}
}

// View the current window to find what to query:
var current = window.location.href;
var yearSelected = current.slice(-4);

// Build yearArray, consisting of all the years in the database
yearArray = [];
for (var i=0; i<48; i++) {
	yearArray.push((i+1970).toString());
}

// Conditional to determine which page runs
if (yearArray.includes(yearSelected)) {
	console.log(yearSelected);
	getYearMap(yearSelected);
} else {
	console.log("homePage");
	var yearSelected = "2017";
	getYearMap(yearSelected);
}

d3.select("#year-selected").html("An interactive map that locates terrorism attacks in "+yearSelected+". Specific years can be viewed from the dropdowns above.");
