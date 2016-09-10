/* global PDFJS, angular */
/* eslint-env browser, jquery */

angular.module('reading', [])

.directive('fileModel', ['$parse', function () {
	return {
		restrict: 'A',
		link: function (scope, element) {
			element.bind('change', function () {
				var file = element[0].files[0];

				if (file.type === 'application/pdf') {
					scope.uploadFile(file);
				} else {
					scope.onWrongFileUpload(file);
				}
			});
		}
	};
}])

.controller('pageRender', function ($scope) {
	PDFJS.workerSrc = '/assets/javascript/pages/pdf.worker.js';
	PDFJS.getDocument('/assets/images/reading.pdf').then(function (pdf) {
		$scope.pdf = pdf;
		$scope.setPage(1);
	});

	$scope.setPage = function (pageNumber) {
		$scope.pdf.getPage(pageNumber).then(function (page) {
			$scope.page = page;
			$scope.pageNumber = pageNumber;
			$scope.updateRender();
			$scope.updateText();
		});
	};

	$scope.uploadFile = function (file) {
		readFile(file).then(function (file) {
			PDFJS.getDocument(file).then(function (pdf) {
				console.log('File Uploaded');
				$scope.pdf = pdf;
				$scope.setPage(1);
			});
		});
	};

	$scope.onWrongFileUpload = function (file) {
		console.log('error! Wrong file type.');
	};

	$scope.nextPage = function () {
		if ($scope.pageNumber < $scope.pdf.numPages) {
			$scope.setPage($scope.pageNumber + 1);
		}
	};

	$scope.previousPage = function () {
		if ($scope.pageNumber > 1) {
			$scope.setPage($scope.pageNumber - 1);
		}
	};

	$scope.updateText = function () {
		$scope.page.getTextContent({combineTextItems: true, normalizeWhitespace: true}).then(function (content) {
			var totalText = '';
			var item;
			for (item in content.items) {
				if ({}.hasOwnProperty.call(content.items, item)) {
					var text = content.items[item].str.trim();

					if (text.trim().length === 0) {
						continue;
					}

					totalText += (text + '\n');
				}
			}

			// console.log(totalText);
		});
	};

	$scope.updateRender = function () {
		var viewport = $scope.page.getViewport(1);

		var scale = ($('body').width() - 60) / viewport.width;

		viewport = $scope.page.getViewport(scale);

		// Prepare canvas using PDF page dimensions.
		var canvas = $('#the-canvas')[0];
		var context = canvas.getContext('2d');
		canvas.height = viewport.height;
		canvas.width = viewport.width;

		// Render PDF page into canvas context.
		var renderContext = {
			canvasContext: context,
			viewport: viewport
		};
		$scope.page.render(renderContext);
	};

	$(window).resize(function () {
		$scope.updateRender();
	});
});

function readFile(file) {
	var reader = new FileReader();
	var deferred = new $.Deferred();

	reader.onload = function (event) {
		deferred.resolve(event.target.result);
	};

	reader.onerror = function () {
		deferred.reject(this);
	};

	reader.readAsDataURL(file);

	return deferred.promise();
}
