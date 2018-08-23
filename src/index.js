/* global angular, localforage */

angular.module('app', ['ui.router', 'ui.bootstrap', 'ngAnimate', 'ngTouch', 'chart.js'])

  .directive('ngEnter', function () {
    return function (scope, element, attrs) {
      element.bind('keydown keypress', function (event) {
        if (event.which === 13) {
          scope.$apply(function () {
            scope.$eval(attrs.ngEnter)
          })
          event.preventDefault()
        }
      })
    }
  })
  .directive('contenteditable', function () {
    return {
      restrict: 'A',
      require: 'ngModel',
      link: function (scope, element, attrs, ngModel) {
        function read () {
          ngModel.$setViewValue(element.html())
        }

        ngModel.$render = function () {
          element.html(ngModel.$viewValue || '')
        }

        element.bind('blur keyup change', function () {
          scope.$apply(read)
        })
      }
    }
  })

  // Developer Mode Enable
  .run(function ($rootScope) {
    var lastClick
    var clicks = 0

    localforage.getItem('developerMode').then(function (value) {
      if (value) {
        enableDeveloperMode()
      }
    })

    $rootScope.showClick = function () {
      var t = new Date().getTime()

      if (t - lastClick < 1000) {
        clicks++
      } else {
        clicks = 0
      }

      if (clicks >= 5 && !$rootScope.developer) {
        enableDeveloperMode()
      }

      if (clicks === 0) {
        lastClick = t
      }
    }

    function enableDeveloperMode () {
      $rootScope.developer = true
      console.log('Developer Mode Enabled')
      localforage.setItem('developerMode', true)
    }
  })
