define(function(require, exports, module) {

  var angular = require('angular')
    , Column  = require('./Column');

  var Grid = module.exports = function(scope, config) {

    var self = this, defaults = {};

    /* --------------------------------------- */
    /* --( Instance Properties )-- */
    /* --------------------------------------- */

    self.columns  = [];
    self.config   = angular.extend(defaults, config);

    angular.forEach(self.config.colDef, function(col, i) {
      self.columns.push(new Column(angular.extend(col, {index: i}), scope));
    });

    /* --------------------------------------- */
    /* --( Scope Properties )-- */
    /* --------------------------------------- */

    scope.cols        = self.columns;
    scope.rows        = self.config.data;
    scope.sortValue   = '';

    /* --------------------------------------- */
    /* --( Scope Listeners )-- */
    /* --------------------------------------- */

    scope.$on('uniGridSortChange', function(event, col) {
      var sortValue    = '';
      sortValue        = (col.sortDirection === 'ASC') ? '' : '-';
      sortValue       += col.field;
      scope.sortValue  = sortValue;
    });
  };

});