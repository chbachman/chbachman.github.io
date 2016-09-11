/* global angular */

angular.module('app')

.config(function routesConfig($stateProvider, $urlRouterProvider, $locationProvider) {
	$locationProvider.html5Mode(true).hashPrefix('!');
	$urlRouterProvider.otherwise('/error/');

	$stateProvider.state('app', {
		url: '/',
		component: 'main'
	});

	$stateProvider.state('contact', {
		url: '/contact/',
		component: 'contact'
	});

	$stateProvider.state('ma', {
		url: '/modulararmour/',
		component: 'modularArmour'
	});

	$stateProvider.state('error', {
		url: '/error/',
		component: 'error'
	});
});
