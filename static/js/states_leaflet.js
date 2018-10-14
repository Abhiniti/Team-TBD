//Read Data from dropdown
function getData(value){
		//console.log(value);
		buildMap(value);
	}	

//build Leaflet Map
function buildMap(year) {

	//reading data 
	var url = "/api/state_data";
	d3.json(url).then(function(d) {
	//convert to Int
	var intVar = parseInt(year);
	
	//into local JSON
	var state_dict = new Array();
	var currentMax;
	for (var i = 0; i < d.year.length; i++){
		//1999		
		if (d.year[i] == intVar) {
			var dict = {};
			dict['name'] = d.state[i];
			dict['rate'] = d.rate[i];
			dict['year'] = d.year[i];
			//colors
			if (d.rate[i] < 10) {dict['color'] = "#FFEDA0"};
			if (d.rate[i] >= 10 && d.rate[i] < 15) {dict['color'] = "#FEB24C"};
			if (d.rate[i] >= 15 && d.rate[i] < 25) {dict['color'] = "#FD8D3C"};
			if (d.rate[i] >= 25 && d.rate[i] < 40) {dict['color'] = "#FC4E2A"};
			if (d.rate[i] >= 40) {dict['color'] = "#800026"};
			
			state_dict.push(dict);	
		}
	}



//MAX and MIN RATES
var RatesArr = new Array;
for (var i = 0; i < d.year.length; i++){
		//1999		
		if (d.year[i] == intVar) {
			RatesArr.push(d.rate[i]);	
		}
	}
var maxRate = Math.max.apply(null, RatesArr);
var minRate = Math.min.apply(null, RatesArr);
var maxState;
var minState;

for (var i = 0; i < d.year.length; i++){
		//1999		
		if (d.rate[i] == maxRate) {
			maxState = abbrState(d.state[i], 'name');
		}
		if (d.rate[i] == minRate) {
			minState = abbrState(d.state[i], 'name');
		}
	}
document.getElementById("statsYear").innerHTML = "";
document.getElementById("greatestRate").innerHTML = "";
document.getElementById("smallestRate").innerHTML = "";

document.getElementById("statsYear").innerHTML = "STATISTICS IN YEAR " + intVar;
document.getElementById("greatestRate").innerHTML = "State with greatest death rate: <u>" + maxState + "</u> (" + maxRate + ")";
document.getElementById("smallestRate").innerHTML = "State with smallest death rate: <u>" + minState + "</u> (" + minRate + ")";


	//adding rate to statesData
	for (var i = 0; i < statesData.features.length; i++){

		for (var j = 0; j < state_dict.length; j++){
			//adding rate
			if (statesData.features[i].properties.name == abbrState(state_dict[j].name, 'name')){
				statesData.features[i].properties['rate'] = state_dict[j].rate;
				statesData.features[i].properties['year'] = state_dict[j].year;
			}
		}
	}

	//getColor
	function getColor(name, state_dict){
		for (var i = 0; i < state_dict.length; i++){
			if (name == state_dict[i].name) {
				return state_dict[i].color;
			}
		}
	}
	
	//styling
	function styleStates(feature) {
    return {
        fillColor: getColor(abbrState(feature.properties.name, 'abbr'),state_dict),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    };
}


	// Creating our initial map object
	// We set the longitude, latitude, and the starting zoom level
	// This gets inserted into the div with an id of 'map'

	//Resetting map on reload
	var container = L.DomUtil.get('map');
	if(container != null){
		container._leaflet_id = null;
	}
	
	//Building map
	var myMap = L.map("map", {
	  center: [38.5, -96.5],
	  zoom: 5,
	  zoomDelta: 0.25,
	  zoomSnap: 0,
	  wheelPxPerZoomLevel: 200
	});

	// Adding a tile layer (the background map image) to our map
	// We use the addTo method to add objects to our map
	L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
	  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
	  maxZoom: 18,
	  id: "mapbox.streets",
	  accessToken: API_KEY
	}).addTo(myMap);
	
	
	// control that shows state info on hover
	var info = L.control();

	info.onAdd = function (myMap) {
		this._div = L.DomUtil.create('div', 'info');
		this.update();
		return this._div;
	};

	info.update = function (statesData) {
		this._div.innerHTML = '<h4>Drug Overdose Death Rate</h4>' +  (statesData ?
			'<b>' + statesData.name + '</b><br />' + 'Year: ' + statesData.year + '<br />'+ statesData.rate + ' deaths/100K people'
			: 'Hover over a state');
	};

	info.addTo(myMap);
	
	//highlighting state
	function highlightFeature(e) {
		var layer = e.target;

		layer.setStyle({
			weight: 5,
			color: '#D2691E',
			dashArray: '',
			fillOpacity: 0.7
		});

		if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
			layer.bringToFront();
		}

		info.update(layer.feature.properties);
	}
	
	//resetting highlight
	var geojson;
	function resetHighlight(e) {
		geojson.resetStyle(e.target);
		info.update();
	}
	
	//zoom
	function zoomToFeature(e) {
		map.fitBounds(e.target.getBounds());
	}

	//feature for highlight
	function onEachFeature(feature, layer) {
		layer.on({
			mouseover: highlightFeature,
			mouseout: resetHighlight,
			click: zoomToFeature
		});
	}
	
	//putting all info into map object
	geojson = L.geoJson(statesData, {style: styleStates, onEachFeature: onEachFeature}).addTo(myMap);
	
	//legend
	var legend = L.control({position: 'bottomright'});

	legend.onAdd = function (myMap) {

		var div = L.DomUtil.create('div', 'info legend'),
			rates = [0, 10, 15, 25, 40],
			labels = [];

		// loop through our density intervals and generate a label with a colored square for each interval
		for (var i = 0; i < rates.length; i++) {
			div.innerHTML +=
				'<i style="background:' + getLegendColor(rates[i] + 1) + '"></i> ' +
				rates[i] + (rates[i + 1] ? '&ndash;' + rates[i + 1] + '<br>' : '+');
		}

		return div;
	};

	legend.addTo(myMap);

	function getLegendColor(d) {
		return d > 40  ? '#800026' :
			   d > 25  ? '#FC4E2A' :
			   d > 15  ? '#FD8D3C' :
			   d > 10  ? '#FEB24C' :
						 '#FFEDA0';
	}
/*	
	var names = ['Frank', 'Tom', 'Peter', 'Mary'];

	var ul = d3.select('#stateInfo').append('ul');

	ul.selectAll('li')
	.data(names)
	.enter()
	.append('li')
	.html(String);
	
*/	
	
	//end of d3 csv
	});
//end of buildMap function

//creating stateInfo

}
