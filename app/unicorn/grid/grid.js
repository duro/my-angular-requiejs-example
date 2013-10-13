define(function(require, exports, module) {

  // Requirements
  var angular = require('angular')
    , Grid    = require('./classes/Grid');

  // Module Definition
  var grid = module.exports = angular.module('unicorn.grid', [])

  /* --------------------------------------- */
  /* --( Directive: UniGrid )-- */
  /* --------------------------------------- */

  .directive('uniGrid', function() {
    return {

      restrict: 'A',
      scope: true,
      templateUrl: 'app/unicorn/grid/templates/grid.html',

      link: function(scope, iElement, attrs) {
        var grid = new Grid(scope, scope.$eval(attrs.uniGrid));
      }
    };
  })

  /* --------------------------------------- */
  /* --( Directive: UniCell )-- */
  /* --------------------------------------- */

  .directive('uniCell', function($compile, $http, $templateCache) {
    return {
      restrict: 'A',
      link: function(scope, iElement, attrs) {
        if (scope.col.cellTemplateUrl) {
          $http.get(scope.col.cellTemplateUrl, {cache: $templateCache})
            .success(function(html){
              iElement.html($compile(html)(scope));
            });
        } else {
          iElement.text(scope.row[scope.col.field]);
        }
      }
    };
  });

});
