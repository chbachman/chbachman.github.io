/* global PDFJS, angular */
/* eslint-env browser, jquery */

console.log(angular);

angular.module('reading', [])

.controller('pageRender', function () {

});

$(document).ready(function () {
	PDFJS.workerSrc = '/assets/javascript/pages/pdf.worker.js';

  // Fetch the PDF document from the URL using promises.
	PDFJS.getDocument('/assets/images/reading.pdf').then(function (pdf) {
    // Fetch the page.
		pdf.getPage(2).then(function (page) {
			renderPage(page);

			$(window).resize(function () {
				renderPage(page);
			});

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

	function renderPage(page) {
		var viewport = page.getViewport(1);

		var scale = ($('body').width() - 30) / viewport.width;

		viewport = page.getViewport(scale);

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
		page.render(renderContext);
	}
});
