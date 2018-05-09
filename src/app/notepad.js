// global localforage

angular.module('app')
.component('notepad', {
	templateUrl: 'app/notepad.html'
})
.controller('notes', function ($scope) {
	$scope.text = '';

	var worker = new Worker('background/notepad-save.js');

	localforage.getItem('notepad-text').then(function (value) {
		$scope.text = value;
		$scope.$apply();
	});

	var saveText = _.throttle(_saveText, 5000);

	$scope.noteTyped = function () {
		saveText();
	};

	$scope.$on('$destroy', function () {
		_saveText();
	});

	function _saveText() {
		worker.postMessage($scope.text);
	}
});
