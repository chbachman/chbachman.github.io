/* globals angular, _ */

angular.module('app')

  .config(function routesConfig ($stateProvider, $urlRouterProvider, $transitionsProvider, $locationProvider) {
    $urlRouterProvider.otherwise('/')

    $stateProvider.state('app', {
      url: '/',
      component: 'main'
    })

    $stateProvider.state('contact', {
      url: '/contact/',
      component: 'contact'
    })

    $stateProvider.state('ma', {
      url: '/modulararmour/',
      component: 'modularArmour'
    })

    $stateProvider.state('rsvp', {
      url: '/rsvp/{rsvpId}/',
      component: 'rsvp'
    })

    $stateProvider.state('error', {
      url: '/error/',
      component: 'error'
    })

    $stateProvider.state('personality', {
      url: '/personality/',
      component: 'personality',
      js: ['vendor/Chart.min.js']
    })

    $stateProvider.state('rsvpCreate', {
      url: '/rsvp/',
      component: 'rsvpCreate'
    })

    $locationProvider.html5Mode(true)

    // This handles the page specific javascript injection of libraries.
    // Allows some pages to have large libraries that don't impact other pages.
    $transitionsProvider.onEnter({to: '*'},
      function ($transition, $state) {
        function checkForEvent () {
          if (_.size($state.js) === 0) {
            // We are empty, and don't have any more dependencies to load.
            // This is a really ugly way to send an event with $rootScope without having it. Sorry :/
            var $body = angular.element(document.body)
            var $rootScope = $body.injector().get('$rootScope')
            $rootScope.$broadcast('externalLoad')
          }
        }

        // Check to see if we are already satisified.
        checkForEvent()

        _.forEach($state.js, function (value) {
          var script = angular.element('<script></script>')
          script.attr({
            type: 'text/javascript',
            src: value
          })
          angular.element(document.head).append(script)

          script.ready(function () {
            // We just loaded it, we don't need to load it after this.
            _.pull($state.js, value)

            checkForEvent()
          })
        })
      }
    )
  })
