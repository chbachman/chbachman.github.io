/* eslint-env jquery, browser */
/* global angular */
angular.module('chbachman', ['ui.bootstrap', 'ngAnimate'])

.config([
	'$interpolateProvider', function ($interpolateProvider) {
		return $interpolateProvider.startSymbol('{(').endSymbol(')}');
	}
])

.controller('MainController', function () {

})

.controller('Carousel', function ($scope) {
	$scope.myInterval = 5000;
	$scope.active = 0;
	var slides = $scope.slides = [{image: '/assets/images/armouritem.png', id: 0}];
	var currIndex = 1;

	$scope.addSlide = function (path) {
		slides.push({
			image: path,
			id: currIndex++
		});
	};

	$scope.addSlide('/assets/images/armouritem.png');
	$scope.addSlide('/assets/images/armouron.png');
	$scope.addSlide('/assets/images/defaultgui.png');
	$scope.addSlide('/assets/images/selectgui.png');
	$scope.addSlide('/assets/images/upgradeList.png');
});
