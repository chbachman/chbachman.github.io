/* globals angular, _ */

angular.module('app')
  .component('personality', {
    templateUrl: 'app/personality.html'
  })
  .controller('personalityForm', function ($scope, $http) {
    $scope.plus = []
    $scope.minus = []

    $scope.D = 0
    $scope.I = 0
    $scope.S = 0
    $scope.C = 0

    $scope.options = {
      scales: {
        yAxes: [{
          ticks: {
            max: 7,
            min: 0,
            stepSize: 1
          }
        }]
      },
      tooltips: {
        enabled: false
      }
    }

    // D, I, S, C
    $scope.data = [0, 0, 0, 0]
    $scope.labels = ['Dominance', 'Influence', 'Steadiness', 'Conscientiousness']

    $http.get('/app/personality.json').then(function (response) {
      $scope.questions = response.data.questions
      $scope.normalization = response.data.normalization
      $scope.personality = {
        categories: response.data.categories,
        table: response.data.table
      }
    }, function (error) {
      console.log(error)
    })

    $scope.onClick = function (question, choice, positive) {
      if (positive) {
        $scope.plus[question] = choice
      } else {
        $scope.minus[question] = choice
      }

      recalculate()
    }

    function recalculate () {
      $scope.D = 0
      $scope.I = 0
      $scope.S = 0
      $scope.C = 0

      _.forEach($scope.plus, function (value, index) {
        if (value === undefined) {
          return
        }

        var option = $scope.plus[index]
        var trait = $scope.questions[index].options[option].plus
        $scope[trait]++
      })

      _.forEach($scope.minus, function (value, index) {
        if (value === undefined) {
          return
        }

        var option = $scope.minus[index]
        var trait = $scope.questions[index].options[option].minus
        $scope[trait]--
      })

      $scope.data[0] = getNormal('D', $scope.D)
      $scope.data[1] = getNormal('I', $scope.I)
      $scope.data[2] = getNormal('S', $scope.S)
      $scope.data[3] = getNormal('C', $scope.C)

      getPersonalityType($scope.data)
    }

    function getNormal (type, value) {
      var arr = $scope.normalization[type]

      for (var i = 0; i < arr.length; i++) {
        if (value < arr[i]) {
          return i + 1
        }
      }
    }

    function getPersonalityType (data) {
      var key = String(data[0]) + String(data[1]) + String(data[2]) + String(data[3])
      var index = $scope.personality.table[key]
      $scope.category = $scope.personality.categories[index]
    }
  })
