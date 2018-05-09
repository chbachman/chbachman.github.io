/* eslint-env worker */
importScripts('/vendor/localforage.min.js');

onmessage = function (event) {
	// var time = Date.now();
	localforage.setItem('notepad-text', event.data).then(function () {
		// console.log('Saved in ' + (Date.now() - time) + 'ms');
	});
};
