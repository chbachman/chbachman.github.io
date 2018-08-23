/* global angular, _ */

angular.module('app')
  .component('rsvp', {
    templateUrl: 'app/rsvp.html'
  })
  .controller('rsvpController', function ($scope, $http, $stateParams) {
    var url = 'https://api.chbachman.com/' + $stateParams.rsvpId
    $http.get(url).then(function (response) {
      $scope.event = response.data
    })

    $scope.onSubmit = function () {
      if ($scope.event.selected === undefined) { return }
      if ($scope.event.name === undefined) { return }
      $http.post(url, {
        name: $scope.event.name,
        selected: $scope.event.selected
      })
    }
  })
  .component('rsvpCreate', {
    templateUrl: 'app/rsvp-create.html'
  })
  .controller('rsvpCreateController', function ($scope, $http, $state) {
    $scope.event = {
      date: new Date()
    }

    $scope.datePopup = {
      opened: false
    }

    $scope.addToList = function () {
      var options = $scope.event.options

      // Make sure it is created.
      if (!options) {
        $scope.event.options = options = []
      }

      // If is is only whitespace, remove it.
      $scope.event.options = options = _.filter(options, function (option) {
        // For some reason contenteditable adds a <br> if the tag is otherwise empty.
        // So mark it as only whitespace.
        if (option === '<br>') {
          return false
        }

        return option.trim().length > 0
      })

      // Add the last line of whitespace back.
      options.push('')
    }

    $scope.addToList()

    $scope.verifyDate = function () {
      if (!$scope.event.date) {
        $scope.errorText = 'Date format is invalid. Please use YYYY-MM-DD'
      } else {
        $scope.errorText = null
      }
    }

    $scope.onSubmit = function () {
      if (!$scope.event.date) {
        return
      }

      $http.post('https://api.chbachman.com/', $scope.event).then(function (response) {
        $state.go('rsvp', { rsvpId: response.data._id })
      })
    }
  })
