define(function(require, exports, module) {

  var angular = require('angular');

  require('ui.router');

  // Module declaration
  var mainNav = module.exports = angular.module('unicorn.mainNav', ['ui.router'])

  // Declare MainNav Directive
  .directive('mainNav', function() {
    return {

      restrict: 'A',
      templateUrl: 'app/unicorn/main-nav/templates/main-nav.html',

      controller: function($scope, $element, $attrs) {
        $scope.navConfig = [
          {name: 'Users', icon: 'user', state: 'users', route: '/users'},
          {name: 'Gigs', icon: 'laptop', state: 'gigs', route: '/gigs'}
          // {name: 'Examples', icon: 'compass', subs: [
          //   {name: 'Line Item 1', route: 'examples/first-item'},
          //   {name: 'Line Item 2', route: 'examples/second-item'},
          //   {name: 'Line Item 3', route: 'examples/third-item'}
          // ]}
        ];
      },

      link: function(scope, element, attrs) { }
    };
  });

});
