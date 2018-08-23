/* globals angular */

angular.module('app')
  .component('modularArmour', {
    templateUrl: 'app/modular-armour.html'
  })
  .controller('Carousel', function ($scope) {
    $scope.myInterval = 5000
    $scope.active = 0
    var slides = $scope.slides = []
    var currIndex = 0

    $scope.addSlide = function (path) {
      slides.push({
        image: path,
        id: currIndex++
      })
    }

    $scope.addSlide('/images/armouritem.png')
    $scope.addSlide('/images/armouron.png')
    $scope.addSlide('/images/defaultgui.png')
    $scope.addSlide('/images/selectgui.png')
    $scope.addSlide('/images/upgradeList.png')
  })
