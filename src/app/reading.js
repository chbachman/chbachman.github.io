/* global PDFJS */
angular.module('app')
.component('reading', {
	templateUrl: 'app/reading.html'
})
.controller('pdf', function ($rootScope) {
	console.log('Controller');

	$rootScope.$on('externalLoad', function () {
		PDFJS.workerSrc = '/vendor/pdf.worker.js';

		PDFJS.getDocument('/images/reading.pdf').then(function (pdf) {
			// Fetch the page.
			pdf.getPage(2).then(function (page) {
				renderPage(page);

				page.getTextContent({combineTextItems: true, normalizeWhitespace: true}).then(function (content) {
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

					console.log(totalText);
				});
			});
		});
	});

	function renderPage(page) {
		var viewport = page.getViewport(1);

		var scale = (2000 - 30) / viewport.width;

		viewport = page.getViewport(scale);

		// Prepare canvas using PDF page dimensions.
		var canvas = document.getElementById('the-canvas');
		var context = canvas.getContext('2d');
		canvas.height = viewport.height;
		canvas.width = viewport.width;

		// Render PDF page into canvas context.
		var renderContext = {
			canvasContext: context,
			viewport: viewport
		};
		page.render(renderContext);
	}
})
.directive('pdfjs', function () {

});
