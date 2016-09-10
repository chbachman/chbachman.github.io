---
layout: default
permalink: /reading/
title: Reading
angular: reading
js:
  - pdf
  - pdf.worker
  - reading
---
This is my reading page.

<div class="panel panel-default" ng-controller="pageRender">
	<button class="btn btn-default" type="submit" ng-click="previousPage()">Previous Page</button>
	<button class="btn btn-default" type="submit" ng-click="nextPage()">Next Page</button>

  <label class="btn btn-default">
    Browse <input type="file" file-model="file" style="display: none;">
  </label>

  <div class="panel-body">
    <canvas id="the-canvas" style="border:1px solid black;"/>
  </div>
</div>
