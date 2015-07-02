
	var map;
	var geocoder;
	var k;
	var bounds = new google.maps.LatLngBounds();
	var markersArray = [];
	
	var theOrigins = [[48.893401, 2.091545],[48.903332, 2.040819],[48.939371, 2.166818],[48.866816, 2.191709],[48.847954, 2.138151],[48.859362, 2.021421]];
	var theDestinations = [[48.903332, 2.040819],[48.939371, 2.166818],[48.866816, 2.191709],[48.847954, 2.138151],[48.859362, 2.021421]];	

	var origin0 = new google.maps.LatLng(48.893401, 2.091545);
	
	var origin1 = new google.maps.LatLng(48.903332, 2.040819);
	var destination1 = new google.maps.LatLng(48.903332, 2.040819);

	var origin2 = new google.maps.LatLng(48.939371, 2.166818);
	var destination2 = new google.maps.LatLng(48.939371, 2.166818);

	var origin3 = new google.maps.LatLng(48.866816, 2.191709);
	var destination3 = new google.maps.LatLng(48.866816, 2.191709);

	var origin4 = new google.maps.LatLng(48.847954, 2.138151);
	var destination4 = new google.maps.LatLng(48.847954, 2.138151);

	var origin5 = new google.maps.LatLng(48.859362, 2.021421);
	var destination5 = new google.maps.LatLng(48.859362, 2.021421);
	
	var destinationIcon = 'https://chart.googleapis.com/chart?chst=d_map_pin_letter&chld=D|FF0000|000000';
	var originIcon = 'https://chart.googleapis.com/chart?chst=d_map_pin_letter&chld=O|FFFF00|000000';

	function initialize() {
	  var opts;
	  opts = {
		center: new google.maps.LatLng(48.893401, 2.091545),
		zoom: 14
	  };
	  map = new google.maps.Map(document.getElementById('map-canvas'), opts);
	  geocoder = new google.maps.Geocoder();
	}
	
	function calculateDistances0() {
	  var service = new google.maps.DistanceMatrixService();
	  k=0;
	  service.getDistanceMatrix(
		{
		  origins: [origin0],
		  destinations: [destination1,destination2,destination3,destination4,destination5],
		  travelMode: google.maps.TravelMode.DRIVING,
		  unitSystem: google.maps.UnitSystem.METRIC,
		  avoidHighways: false,
		  avoidTolls: false
		}, callback);
		
	}	

	function calculateDistances1() {
	  var service = new google.maps.DistanceMatrixService();
	  k=1;
	  service.getDistanceMatrix(
		{
		  origins: [origin1],
		  destinations: [destination2,destination3,destination4,destination5],
		  travelMode: google.maps.TravelMode.DRIVING,
		  unitSystem: google.maps.UnitSystem.METRIC,
		  avoidHighways: false,
		  avoidTolls: false
		}, callback);
		
	}

	function calculateDistances2() {
	  var service = new google.maps.DistanceMatrixService();
	  k=2;
	  service.getDistanceMatrix(
		{
		  origins: [origin2],
		  destinations: [destination1,destination3,destination4,destination5],
		  travelMode: google.maps.TravelMode.DRIVING,
		  unitSystem: google.maps.UnitSystem.METRIC,
		  avoidHighways: false,
		  avoidTolls: false
		}, callback);
	}

	function calculateDistances3() {
	  var service = new google.maps.DistanceMatrixService();
	  k=3;
	  service.getDistanceMatrix(
		{
		  origins: [origin3],
		  destinations: [destination1,destination2,destination4,destination5],
		  travelMode: google.maps.TravelMode.DRIVING,
		  unitSystem: google.maps.UnitSystem.METRIC,
		  avoidHighways: false,
		  avoidTolls: false
		}, callback);
	}

	function calculateDistances4() {
	  var service = new google.maps.DistanceMatrixService();
	  k=4;
	  service.getDistanceMatrix(
		{
		  origins: [origin4],
		  destinations: [destination1,destination2,destination3,destination5],
		  travelMode: google.maps.TravelMode.DRIVING,
		  unitSystem: google.maps.UnitSystem.METRIC,
		  avoidHighways: false,
		  avoidTolls: false
		}, callback);
	}	

	function calculateDistances5() {
	  var service = new google.maps.DistanceMatrixService();
	  k=5;
	  service.getDistanceMatrix(
		{
		  origins: [origin5],
		  destinations: [destination1,destination2,destination3,destination4],
		  travelMode: google.maps.TravelMode.DRIVING,
		  unitSystem: google.maps.UnitSystem.METRIC,
		  avoidHighways: false,
		  avoidTolls: false
		}, callback);
	}	
	
	function callback(response, status) {
	  if (status != google.maps.DistanceMatrixStatus.OK) {
		alert('Error was: ' + status);
	  } else {
		var origins = response.originAddresses;
		var destinations = response.destinationAddresses;
		var outputDiv = document.getElementById('outputDiv');
		//outputDiv.innerHTML = '';
		deleteOverlays();
	   
		for (var i = 0; i < origins.length; i++) {
		  var results = response.rows[i].elements;
		  addMarker(origins[i], false);
		  for (var j = 0; j < results.length; j++) {
			addMarker(destinations[j], true);
			console.log(results[j]);
			outputDiv.innerHTML += "[ " + theOrigins[k] + " ] - [ " + theDestinations[j]
				+ ' ] --> ' + results[j].distance.value + '<br>';
		  }
		}
		outputDiv.innerHTML += "<br /><br />";
	  }

	}

	function addMarker(location, isDestination) {
	  var icon;
	  if (isDestination) {
		icon = destinationIcon;
	  } else {
		icon = originIcon;
	  }
	  geocoder.geocode({'address': location}, function(results, status) {
		if (status == google.maps.GeocoderStatus.OK) {
		  bounds.extend(results[0].geometry.location);
		  map.fitBounds(bounds);
		  var marker = new google.maps.Marker({
			map: map,
			position: results[0].geometry.location,
			icon: icon
		  });
		  markersArray.push(marker);
		} else {
		  alert('Geocode was not successful for the following reason: '
			+ status);
		}
	  });
	}

	function deleteOverlays() {
	  for (var i = 0; i < markersArray.length; i++) {
		markersArray[i].setMap(null);
	  }
	  markersArray = [];
	}

	google.maps.event.addDomListener(window, 'load', initialize);
	
