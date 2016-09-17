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
			function checkForEvent() {
				if (_.size($state.js) === 0) { // We are empty, and don't have any more dependencies to load.
					// This is a really ugly way to send an event with $rootScope without having it. Sorry :/
					var $body = angular.element(document.body);
					var $rootScope = $body.injector().get('$rootScope');
					$rootScope.$broadcast('externalLoad');
				}
			}

			// Check to see if we are already satisified.
			checkForEvent();

			_.forEach($state.js, function (value) {
				var script = angular.element('<script></script>');
				script.attr({
					type: 'text/javascript',
					src: value
				});
				angular.element(document.head).append(script);

				script.ready(function () {
					// We just loaded it, we don't need to load it after this.
					_.pull($state.js, value);

					checkForEvent();
				});
			});
		}
	);
});
