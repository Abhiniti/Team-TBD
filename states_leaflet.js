// Creating our initial map object
// We set the longitude, latitude, and the starting zoom level
// This gets inserted into the div with an id of 'map'
var myMap = L.map("map", {
  center: [38.5, -96.5],
  zoom: 5
});

// Adding a tile layer (the background map image) to our map
// We use the addTo method to add objects to our map
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
}).addTo(myMap);

//Read CSV
var request = new XMLHttpRequest();
request.open("GET", "DRUG_DEATHS2016.csv", false);
request.send(null);

var csvData = new Array();
var jsonObject = request.responseText.split(/\r?\n|\r/);
for (var i = 1; i < jsonObject.length; i++) {
	data = jsonObject[i].split(',');
	var dict = {}
	dict['name'] = data[0];
	dict['rate'] = data[1];
	if (data[1] < 10) {dict['color'] = "#FFEDA0"};
	if (data[1] > 10 && data[1] < 15) {dict['color'] = "#FEB24C"};
	if (data[1] > 15 && data[1] < 25) {dict['color'] = "#FD8D3C"};
	if (data[1] > 25 && data[1] < 40) {dict['color'] = "#FC4E2A"};
	if (data[1] > 40) {dict['color'] = "#800026"};
	csvData.push(dict);
}
console.log(csvData);
//getColor
function getColor(name, csvData){
	for (var i = 0; i < csvData.length; i++){
		if (name == csvData[i].name) {
			return csvData[i].color;
		}
	}
}
getColor("NE",csvData);

function styleStates(feature) {
    return {
        fillColor: getColor(abbrState(feature.properties.name, 'abbr'),csvData),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    };
}

L.geoJson(statesData, {style: styleStates}).addTo(myMap);