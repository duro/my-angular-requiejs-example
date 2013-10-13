define(function(require, exports, module) {

  var angular = require('angular');

  var Column = module.exports = function(colDef, scope) {

    var self = this
      , defaults = {
          field         : undefined,
          displayName   : undefined,
          colClass      : undefined,
          sortable      : true
        };

    /* --------------------------------------- */
    /* --( Instance Properties )-- */
    /* --------------------------------------- */

    self.config           = angular.extend(defaults, colDef);
    self.isSortTarget     = false;
    self.sortDirection    = undefined;
    self.index            = self.config.index;
    self.field            = self.config.field;
    self.displayName      = self.config.displayName;
    self.sortable         = self.config.sortable;
    self.colClass         = self.config.colClass;
    self.cellTemplateUrl  = self.config.cellTemplateUrl;
    self.cursor           = self.sortable ? 'pointer' : 'default';

    /* --------------------------------------- */
    /* --( Instance Methods )-- */
    /* --------------------------------------- */

    self.indexClass = function() {
      return 'col' + self.index;
    };

    self.sort = function(event) {
      if (!self.sortable) {
        return false;
      }
      self.sortDirection = (self.sortDirection === 'ASC') ? 'DESC' : 'ASC';
      scope.$emit('uniGridSortChange', self);
    };

    /* --------------------------------------- */
    /* --( Scope Listeners )-- */
    /* --------------------------------------- */

    scope.$on('uniGridSortChange', function(event, sortCol) {
      self.isSortTarget = sortCol === self;
    });

  };

});