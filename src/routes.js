/* global angular */

angular.module('app')

.config(function routesConfig($stateProvider, $urlRouterProvider, $locationProvider, $transitionsProvider) {
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

	$stateProvider.state('reading', {
		url: '/reading/',
		component: 'reading',
		js: ['/vendor/pdf.js', '/vendor/pdf.worker.js']
	});

	$stateProvider.state('error', {
		url: '/error/',
		component: 'error'
	});

	$transitionsProvider.onEnter({to: '*'},
		function ($transition, $state) {
			_.forEach($state.js, function (value, key) {
				if (!document.getElementById($state.component + key)) {
					var script = document.createElement('script');
					script.id = $state.component + key;
					script.type = 'text/javascript';
					script.async = true;
					script.onload = function () {
						console.log('Loaded');
					};
					script.src = value;
					document.getElementsByTagName('head')[0].appendChild(script);
				}
			});
		}
	);
});
