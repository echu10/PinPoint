angular.module('starter')

.controller('MapController', [ '$scope', '$state', '$cordovaGeolocation', '$ionicLoading', 'GoogleMaps', 'Foursquare', 'Settings', 
	function ($scope, $state, $cordovaGeolocation, $ionicLoading, GoogleMaps, Foursquare, Settings) {
	
	$scope.GoogleMaps = GoogleMaps;

	//GoogleMaps.init();

	$scope.chooseLocation = function() {
		$ionicLoading.show({
			template: '<p class="item-icon-left">Pinpointing..<ion-spinner class="spinner-energized" icon="lines"/></p>'
		});
		var options = {enableHighAccuracy: true};

		$cordovaGeolocation.getCurrentPosition(options).then(function(position) {

			var myLat = position.coords.latitude;
			var myLng = position.coords.longitude;
			
			
			Foursquare.whereAt(myLat, myLng, Settings.query, Settings.price, function(data) {
				var numVenues = data['response']['groups'][0]['items'].length;
				var num = Math.floor((Math.random() * numVenues));
				console.log(num);
				console.log(data['response']['groups'][0]['items']);

				var venueLat = data['response']['groups'][0]['items'][num]['venue']['location']['lat'];
				var venueLng = data['response']['groups'][0]['items'][num]['venue']['location']['lng'];
				$scope.venueName = data['response']['groups'][0]['items'][num]['venue']['name'];
				$scope.venuePrice = data['response']['groups'][0]['items'][num]['venue']['price']['message'];
				$scope.venueRating = data['response']['groups'][0]['items'][num]['venue']['rating'] + "/10";
				$scope.venueContact = data['response']['groups'][0]['items'][num]['venue']['contact']['formattedPhone'];
				$scope.venueCategory = data['response']['groups'][0]['items'][num]['venue']['categories'][0]['shortName'];
				$scope.venueTip = "\"" + data['response']['groups'][0]['items'][num]['tips'][0]['text'] + "\"";
				$scope.venueUrl = data['response']['groups'][0]['items'][num]['venue']['url'];
				$scope.venueAddress = data['response']['groups'][0]['items'][num]['venue']['location']['address'] + " " + 
										data['response']['groups'][0]['items'][num]['venue']['location']['city'] + " " + 
										data['response']['groups'][0]['items'][num]['venue']['location']['state'] + " " +
										data['response']['groups'][0]['items'][num]['venue']['location']['postalCode'];
				GoogleMaps.init(myLat, myLng, venueLat, venueLng);
				//var location = new google.maps.LatLng(venueLat, venueLng);
				//GoogleMaps.addNewMarker(location, venueName);

				$ionicLoading.hide();

			})
			

		}, function(error) {
			console.log("couldnt get location");
		});

	};

	setTimeout($scope.chooseLocation, 1000);

	/*
	Foursquare.whereAt(tLat, tLng, limit, Settings.query, function(data) {
            
            console.log(data['response']['groups'][0]['items']);
            $scope.testers = data['response']['groups'][0]['items'];
            
            Locations.name = data['response']['groups'][0]['items'][0]['venue']['name'];
            Locations.lat = data['response']['groups'][0]['items'][0]['venue']['location']['lat'];
            Locations.lng = data['response']['groups'][0]['items'][0]['venue']['location']['lng'];
            $scope.map.markers.now = {
                lat: Locations.lat,
                lng: Locations.lng,
                focus: true
            };
        });


	
	$scope.test = function() {
		var location = new google.maps.LatLng(37.7692666, -122.452109);
		GoogleMaps.addNewMarker(location, "test");
		console.log("test");
	};

	setTimeout($scope.test, 5000);*/
}]);