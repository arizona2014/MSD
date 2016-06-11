function initialize() {
  var opts;
  opts = {
	center: new google.maps.LatLng(48.893401, 2.091545),
	zoom: 14,
	mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  map = new google.maps.Map(document.getElementById('map-canvas'), opts);
  geocoder = new google.maps.Geocoder();
}

var map;
google.maps.event.addDomListener(window, 'load', initialize);

var directionsPanel = document.getElementById("my_textual_div");

// Create the tsp object
tsp = new BpTspSolver(myMap, directionsPanel);

// Set your preferences
tsp.setAvoidHighways(true);
tsp.setTravelMode(google.maps.DirectionsTravelMode.WALKING);

// Add points (by coordinates, or by address).
// The first point added is the starting location.
// The last point added is the final destination (in the case of A - Z mode)

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

tsp.addWaypoint(origin0, addWaypointCallback);  // Note: The callback is new for version 3, to ensure waypoints and addresses appear in the order they were added in.
tsp.addWaypoint(origin1, addWaypointCallback);  // Note: The callback is new for version 3, to ensure waypoints and addresses appear in the order they were added in.
tsp.addWaypoint(origin2, addWaypointCallback);  // Note: The callback is new for version 3, to ensure waypoints and addresses appear in the order they were added in.
tsp.addWaypoint(origin3, addWaypointCallback);  // Note: The callback is new for version 3, to ensure waypoints and addresses appear in the order they were added in.

// Solve the problem (start and end up at the first location)
tsp.solveRoundTrip(onSolveCallback);
// Or, if you want to start in the first location and end at the last,
// but don't care about the order of the points in between:
tsp.solveAtoZ(onSolveCallback);

// Retrieve the solution (so you can display it to the user or do whatever :-)
var dir = tsp.getGDirections();  // This is a normal GDirections object.
// The order of the elements in dir now correspond to the optimal route.

// If you just want the permutation of the location indices that is the best route:
var order = tsp.getOrder();

// If you want the duration matrix that was used to compute the route:
var durations = tsp.getDurations();

// There are also other utility functions, see the source.