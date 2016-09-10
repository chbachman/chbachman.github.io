/* global angular */

angular.module('app')

.config(function routesConfig($stateProvider, $urlRouterProvider, $locationProvider) {
	$locationProvider.html5Mode(true).hashPrefix('!');
	$urlRouterProvider.otherwise('/');

	$stateProvider.state('app', {
		url: '/',
		component: 'app'
	});

	$stateProvider.state('contact', {
		url: '/contact/',
		component: 'contact'
	});
});
