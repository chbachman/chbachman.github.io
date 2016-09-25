/* global angular */
angular.module("app",["ui.router","ui.bootstrap","ngAnimate","ngTouch","chart.js"]).directive("ngEnter",function(){return function(t,a,n){a.bind("keydown keypress",function(a){13===a.which&&(t.$apply(function(){t.$eval(n.ngEnter)}),a.preventDefault())})}}).run(["$rootScope",function(t){var a,n=0;t.showClick=function(){var e=(new Date).getTime();e-a<1e3?n++:n=0,n>=5&&!t.developer&&(t.developer=!0,console.log("Developer Mode Enabled")),0===n&&(a=e)}}]),angular.module("app").component("chbachmanTitle",{templateUrl:"app/components/title.html"}),angular.module("app").component("chbachmanHeader",{templateUrl:"app/components/header.html"}),angular.module("app").component("chbachmanFooter",{templateUrl:"app/components/footer.html"}),angular.module("app").component("personality",{templateUrl:"app/personality.html"}).controller("personalityForm",["$scope","$http",function(t,a){function n(){t.D=0,t.I=0,t.S=0,t.C=0,_.forEach(t.plus,function(a,n){if(void 0!==a){var e=t.plus[n],o=t.questions[n].options[e].plus;t[o]++}}),_.forEach(t.minus,function(a,n){if(void 0!==a){var e=t.minus[n],o=t.questions[n].options[e].minus;t[o]--}}),t.data[0]=e("D",t.D),t.data[1]=e("I",t.I),t.data[2]=e("S",t.S),t.data[3]=e("C",t.C),o(t.data)}function e(a,n){for(var e=t.normalization[a],o=0;o<e.length;o++)if(n<e[o])return o+1}function o(a){var n=String(a[0])+String(a[1])+String(a[2])+String(a[3]),e=t.personality.table[n];t.category=t.personality.categories[e]}t.plus=[],t.minus=[],t.D=0,t.I=0,t.S=0,t.C=0,t.data=[0,0,0,0],t.labels=["Dominance","Influence","Steadiness","Conscientiousness"],t.colors=["rgba(255, 99, 132, 0.2)","rgba(255, 99, 132, 0.2)","rgba(255, 99, 132, 0.2)","rgba(255, 99, 132, 0.2)"],a.get("/app/personality.json").then(function(a){t.questions=a.data.questions,t.normalization=a.data.normalization,t.personality={categories:a.data.categories,table:a.data.table}}),t.onClick=function(a,e,o){o?t.plus[a]=e:t.minus[a]=e,n()}}]),angular.module("app").component("modularArmour",{templateUrl:"app/modular-armour.html"}).controller("Carousel",["$scope",function(t){t.myInterval=5e3,t.active=0;var a=t.slides=[],n=0;t.addSlide=function(t){a.push({image:t,id:n++})},t.addSlide("/images/armouritem.png"),t.addSlide("/images/armouron.png"),t.addSlide("/images/defaultgui.png"),t.addSlide("/images/selectgui.png"),t.addSlide("/images/upgradeList.png")}]),angular.module("app").component("main",{templateUrl:"app/main.html"}),angular.module("app").component("error",{templateUrl:"app/error.html"}),angular.module("app").component("contact",{templateUrl:"app/contact.html"}),angular.module("app").run(["$templateCache",function(t){t.put("app/contact.html",'<chbachman-header></chbachman-header>\n<chbachman-title></chbachman-title>\n<div class="container-fluid">\n  <div class="row">\n\n    <div class="col-sm-offset-2 col-sm-8">\n      <h2 class="text-center"> Contact me.  </h2>\n      <h2 class="text-center"> <small> I\'d love to see why you would want to. </small> </h2>\n    </div>\n\n    <div class="col-sm-offset-2 col-sm-8">\n      <div class="list-group">\n        <a class="list-group-item" href="https://github.com/chbachman/">\n          <i data-toggle="tooltip" class="fa fa-github fa-3x fa-fw" aria-hidden="true" title="Check out all my crapy code and unfinished projects."></i>\n          <span class="fa-2x"> Github </span>\n        </a>\n        <a class="list-group-item" href="https://twitter.com/chbachman/">\n          <i data-toggle="tooltip" class="fa fa-twitter fa-3x fa-fw" aria-hidden="true" title="Follow me to be amazed by my lack of tweets."></i>\n          <span class="fa-2x"> Twitter </span>\n        </a>\n        <a class="list-group-item" href="https://reddit.com/u/chbachman/">\n          <i data-toggle="tooltip" class="fa fa-reddit fa-3x fa-fw" aria-hidden="true" title="Creep on whatever I have posted earlier."></i>\n          <span class="fa-2x"> Reddit </span>\n        </a>\n        <a class="list-group-item" href="irc://irc.esper.net/chbachman">\n          <i data-toggle="tooltip" class="fa fa-hashtag fa-3x fa-fw" aria-hidden="true" title="Join a chat room from 1988 that I still sometimes go on."></i>\n          <span class="fa-2x"> IRC </span>\n        </a>\n        <a class="list-group-item" href="mailto:cbachman@bachmangroup.com">\n          <i data-toggle="tooltip" class="fa fa-envelope fa-3x fa-fw" aria-hidden="true" title="Email me. If that\'s your thing."></i>\n          <span class="fa-2x"> Email </span>\n        </a>\n      </div>\n    </div>\n\n  </div>\n</div>\n<chbachman-footer></chbachman-footer>\n'),t.put("app/error.html",'<chbachman-header></chbachman-header>\n<chbachman-title></chbachman-title>\n<div class="container-fluid center-text">\n  <h1> And somehow you got here. </h1>\n   <small> I guess I didn\'t finish this either. </small>\n\n   <h2> <a href="/"> You probably want to go back to the main page? </a> </h2>\n</div>\n<chbachman-footer></chbachman-footer>\n'),t.put("app/main.html",'<chbachman-header></chbachman-header>\n<chbachman-title></chbachman-title>\n<div class="container-fluid">\n\n</div>\n<chbachman-footer></chbachman-footer>\n'),t.put("app/modular-armour.html",'<chbachman-header></chbachman-header>\n<div class="container">\n  <div id="logo" class="row">\n    <img class="img-responsive center-block" src="/images/logo.jpg" title="Can\'t you tell my names are so creative?">\n  </div>\n\n  <h2>Integration with:</h2>\n\n  <ul>\n    <li>Thermal Foundation</li>\n    <li>Baubles</li>\n    <li>Thaumcraft</li>\n    <li>Enviromine</li>\n    <li>Blood Magic</li>\n    <li>Botania</li>\n    <li>Minetweaker</li>\n    <li>Solar Expansion</li>\n  </ul>\n\n  <h2>Features:</h2>\n\n  <ul>\n    <li>Modular Armour</li>\n    <li>Editable Recipes. All upgrade recipes are defined by easily editable JSON files in the config directory.</li>\n    <li>Editable Values. Almost all values (energy drain, max power) are defined in the config.</li>\n  </ul>\n\n  <table class="table table-striped table-condensed table-bordered">\n    <thead>\n      <tr> <th colspan="4"> Upgrades </th> </tr>\n    </thead>\n    <tbody>\n      <tr> <td>Jetpack</td> <td>Long Fall Dampeners</td> <td>Solar Helmet</td> <td>Walking Speed Boost</td></tr>\n      <tr> <td>Calf Shields</td> <td>Solar Helmet</td> <td>Auto Feeder</td> <td>Vis Discount</td></tr>\n      <tr> <td>Potion</td> <td>Auto Feeder</td> <td>Step Assist</td> <td>Upgrade of Revealing</td></tr>\n      <tr> <td>Jump Boost</td> <td>Electrolyzer</td> <td>Magnet</td> <td>Night Vision</td></tr>\n      <tr> <td>Leadstone Energy</td> <td>Hardened Energy</td> <td>Reinforced Energy</td> <td>Resonant Energy</td></tr>\n      <tr> <td>Invisibility</td> <td>Thomaz\'s Textures</td> <td>Armor Camouflage</td> <td>Camel Pack</td></tr>\n      <tr> <td>Gas Mask</td> <td>Pixie Spawner</td> <td>Mana Converter</td> <td>LP Converter</td></tr>\n      <tr> <td>Solar Helmet</td> <td>Undead Protection</td> <td>Arthropod Protection</td> <td>Fire Protection</td></tr>\n      <tr> <td>Unblockable Protector</td> <td>Magic Protector</td> <td>Lava Protection</td> <td>Player Protector</td></tr>\n      <tr> <td>Wither Protector</td> <td>Explosion Protector</td> <td>General Protector</td> <td>Projectile Protector</td></tr>\n    </tbody>\n  </table>\n\n  <h2>Pictures:</h2>\n\n  <div ng-controller="Carousel">\n    <div uib-carousel active="active" interval="myInterval" role="listbox">\n      <div uib-slide class="item" ng-repeat="slide in slides track by slide.id" index="slide.id">\n        <img ng-src="{{slide.image}}" class="img-responsive">\n      </div>\n    </div>\n  </div>\n\n  <h3><a href="https://github.com/chbachman/ModularArmour">My mod is open source!</a></h3>\n  <h2>Downloads:</h2>\n  <ul>\n    <li><a href="http://minecraft.curseforge.com/mc-mods/224011-modular-armour">CurseForge</a></li>\n    <li><a href="http://tehnut.info/jenkins/view/chbachman/job/ModularArmour/">Beta Downloads</a></li>\n  </ul>\n  <h2>Issues:</h2>\n  <p>Please keep them out of the various forum posts and social networks, for my sanity.\n  Please use the <a href="https://github.com/chbachman/ModularArmour/issues">Github Issue Tracker</a> to report issues and suggestions.</p>\n  <h2>Modpacks/License:</h2>\n  <h4>Modpacks:</h4>\n  <p>Go Ahead. I can’t control it in the first place, why try to? However, I would prefer if you left me a little note, just so that I can see how many people are using it.</p>\n  <h4>License:</h4>\n  <p>This mod is licensed under the <a href="http://www.gnu.org/licenses/gpl-3.0.en.html">GPLv3</a></p>\n</div>\n<chbachman-footer></chbachman-footer>\n'),t.put("app/personality.html",'<chbachman-header></chbachman-header>\n<div class="container" ng-controller="personalityForm">\n  <div class="page-header">\n    <h1>\n      Personality Quiz\n    </h1>\n  </div>\n    <div class="row" ng-repeat="question in questions">\n\n      <div class="col-xs-6">\n        <ul class="list-group">\n          <li class="list-group-item list-group-item-success">\n            Most\n          </li>\n          <button type="button" class="list-group-item" ng-repeat="option in question.options" ng-class="{\'disabled\': minus[$parent.$index] == $index, \'list-group-item-success\': plus[$parent.$index] == $index}" ng-disabled="minus[$parent.$index] == $index" ng-click="onClick($parent.$index, $index, true)"> {{option.name}} </button>\n        </ul>\n      </div>\n\n\n      <div class="col-xs-6">\n        <ul class="list-group">\n          <li class="list-group-item list-group-item-danger">\n            Least\n          </li>\n          <button type="button" class="list-group-item" ng-repeat="option in question.options" ng-class="{\'disabled\': plus[$parent.$index] == $index, \'list-group-item-danger\': minus[$parent.$index] == $index}" ng-disabled="plus[$parent.$index] == $index" ng-click="onClick($parent.$index, $index, false)"> {{option.name}} </button>\n        </ul>\n      </div>\n\n\n    </div>\n\n    <canvas class="chart chart-bar" chart-data="data" chart-colors="colors" chart-labels="labels"></canvas>\n\n    <h2> You are a {{category.name}} </h2>\n    <p> {{category.description}} </p>\n</div>\n<chbachman-footer></chbachman-footer>\n'),t.put("app/components/footer.html",'<footer class="footer">\n  <div class="container">\n\n    <ul class="nav navbar-nav">\n      <li role="presentation"> <a href="/contact/"> Contact </a> </li>\n      <li class="navbar-right">\n        <p class="navbar-text text-muted">\n          <a href="https://github.com/chbachman/chbachman.github.io/tree/develop">\n            <i class="fa fa-lg fa-angle-left" aria-hidden="true"></i>\n            <i class="fa fa-lg fa-angle-right" aria-hidden="true"></i>\n          </a>\n          with <i class="fa fa-heart" style="color: red" aria-hidden="true"></i> by\n          <a href="https://github.com/chbachman">\n            chbachman\n          </a>\n        </p>\n      </li>\n    </ul>\n\n  </div>\n</footer>\n'),t.put("app/components/header.html",'<nav class="navbar navbar-static-top">\n\t<div class="navbar-header">\n\t\t<button type="button" class="navbar-toggle" ng-init="navCollapsed = true" ng-click="navCollapsed = !navCollapsed">\n\t\t\t<i class="fa fa-bars" aria-hidden="true"></i>\n\t\t</button>\n\t\t<a class="navbar-brand" ui-sref="app">chbachman</a>\n\t</div>\n\n\t<div class="collapse navbar-collapse" uib-collapse="navCollapsed">\n\t\t<ul class="nav navbar-nav">\n\t\t\t<li><a ui-sref="ma">Modular Armour</a></li>\n\t\t\t<li ng-show="$root.developer"><a ui-sref="personality">Personality</a></li>\n\t\t</ul>\n\t</div>\n</nav>\n'),t.put("app/components/title.html",'<div class="jumbotron center-text">\n  <h1> <small> Hi. I\'m </small> chbachman </h1>\n  <div>\n  </div>\n  <h2> I\'m a programmer. I make a lot of projects. </h2>\n  <small ng-click="$root.showClick()"> I almost never finish them </small>\n</div>\n')}]),angular.module("app").config(["$stateProvider","$urlRouterProvider","$locationProvider","$transitionsProvider",function(t,a,n,e){n.html5Mode(!0),a.otherwise("/error/"),t.state("app",{url:"/",component:"main"}),t.state("contact",{url:"/contact/",component:"contact"}),t.state("ma",{url:"/modulararmour/",component:"modularArmour"}),t.state("error",{url:"/error/",component:"error"}),t.state("personality",{url:"/personality/",component:"personality",js:["vendor/Chart.min.js"]}),e.onEnter({to:"*"},function(t,a){function n(){if(0===_.size(a.js)){var t=angular.element(document.body),n=t.injector().get("$rootScope");n.$broadcast("externalLoad")}}n(),_.forEach(a.js,function(t){var e=angular.element("<script></script>");e.attr({type:"text/javascript",src:t}),angular.element(document.head).append(e),e.ready(function(){_.pull(a.js,t),n()})})})}]);
//# sourceMappingURL=../maps/scripts/app-b3be576d62.js.map
