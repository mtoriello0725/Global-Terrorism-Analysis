function globalTerrorismMap() {
	URL = "/api/geography";
	d3.json(URL).then(function(response) {

		var geoData = response;

		var lat = geoData.map(row => row.latitude);
		var long = geoData.map(row => row.longitude);

	});
}
