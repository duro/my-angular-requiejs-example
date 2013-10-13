// hey Angular, we're bootstrapping manually!
window.name = "NG_DEFER_BOOTSTRAP!";

// Include our config
require(['config'], function() {
  // Kickoff our app
  require( [
    'angular',
    'jquery',
    'bootstrap',
    'app'
  ], function(angular, $, Bootstrap, app) {
    'use strict';

    // Grab our HTML element
    var $html = angular.element(document.getElementsByTagName('html')[0]);

    // On DOM Ready - Bootstrap Angular
    $(function() {
      angular.bootstrap($html, ['nodegigs']);
    });
  });

});
