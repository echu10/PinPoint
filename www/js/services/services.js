angular.module('starter')

.factory('Foursquare', ['$http', function ($http) {
	var apiUrl 			= 'https://api.foursquare.com/v2/';
	var CLIENT_ID 		= 'NEW ID';
	var CLIENT_SECRET 	= 'NEW SECRET';
	var v 				= '20160108';

	return {
		whereAt: function (lat, lng, query, price, success) {

			$http({
				url: apiUrl + 'venues/explore?',
				method: "GET",
				params: {
					client_id: CLIENT_ID,
					client_secret: CLIENT_SECRET,
					v: v,
					limit: 20,
					radius: 2000,
					openNow: 1,
					price: price,
					//openNow: 0,
					ll: lat + ',' + lng,
					query: query
				}
			})
			.success(function(data) {
				success(data);
			});
		}
	}

	/*
	function whereAt(lat, lng, limit, query) {
		return  $http.get(apiUrl + 'venues/trending?ll=' + lat + ',' + lng 
			+ '&limit=' + limit + '&openNow=1&client_id=' 
			+ CLIENT_ID + '&client_secret=' + CLIENT_SECRET + '&v=' + v);
	}

	return {
		whereAt:whereAt
	};*/
}])

.factory('Settings', function() {
	var Settings = {
		query: 'food',
		price: 1
	};

	return Settings;
})

.factory('GoogleMaps', function ($cordovaGeolocation) {

	var apiKey = false;
	var map = null;
	var lat = 0;
	var lng = 0;
	var directionDisplay;
	var directionsService = new google.maps.DirectionsService();

	function initMap(myLat, myLng, venueLat, venueLng) {
		//var options = {enableHighAccuracty: true};

		//$cordovaGeolocation.getCurrentPosition(options).then(function (position) {

			//var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
			directionsDisplay = new google.maps.DirectionsRenderer();
			var latLng = new google.maps.LatLng(lat, lng);
			var mapOptions = {
				center: latLng,
				zoom: 15,
				mapTypeId: google.maps.MapTypeId.ROADMAP
			};

			map = new google.maps.Map(document.getElementById("map"), mapOptions);
			directionsDisplay.setMap(map);
			
			calcRoute(myLat, myLng, venueLat, venueLng);
			/*
			google.maps.event.addListenerOnce(map, 'idle', function() {
				addMarker(latLng, "I'm here");
			});/*
			google.maps.event.addListener(document.getElementById('routebtn'), 'click', calcRoute(myLat, myLng, venueLat, venueLng));
			*/
		//}, function (error) {
			//console.log("error");
		//});
	}

	function calcRoute(myLat, myLng, venueLat, venueLng) {

		var start = new google.maps.LatLng(myLat, myLng);
		var end = new google.maps.LatLng(venueLat, venueLng);
		var bounds = new google.maps.LatLngBounds();

		bounds.extend(start);
		bounds.extend(end);
		map.fitBounds(bounds);

		var request = {
			origin: start,
			destination: end,
			travelMode: google.maps.TravelMode.WALKING,
			avoidHighways: true
		};

		directionsService.route(request, function(response, status) {
			if(status == google.maps.DirectionsStatus.OK) {
				directionsDisplay.setDirections(response);
				directionsDisplay.setMap(map);
			} else {
				alert("Directions request from " + start.toUrlValue(6) + " to " + end.toUrlValue(6) + " failed:" + status);
			}
		})

	}


	return {
		init: function(lat, lng, venueLat, venueLng) {
			initMap(lat, lng, venueLat, venueLng);
		}, 
		addNewMarker: function(location, message) {
			marker = new google.maps.Marker({
				position: location,
				animation: google.maps.Animation.DROP,
				map: map
			});

			infoWindow = new google.maps.InfoWindow({
				content: message
			});

			google.maps.event.addListener(marker, 'click', function () {
				infoWindow.open(map, marker);
			});
		}
	}
});














