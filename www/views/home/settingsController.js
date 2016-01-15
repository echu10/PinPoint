angular.module('starter')

.controller('SettingsController', function ($scope, Settings) {
	$scope.settings = Settings;
	$scope.active = '1';
	$scope.setActive = function(type) {
		$scope.active = type;
		Settings.price = $scope.active;
		console.log(Settings.price);
	};
	$scope.isActive = function(type) {
		return type === $scope.active;
	};
});