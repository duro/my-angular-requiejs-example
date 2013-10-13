define(function(require, exports, module) {

  // Load Dependencies
  var angular = require('angular');

  // Load Other Angular Modules
  require('ui.router');
  require('restangular');
  require('unicorn/grid/grid');

  // Declare Module
  var users = module.exports = angular.module('nodegigs.users', [
    'ui.router',
    'restangular',
    'unicorn.grid'
  ])

  /**
   * Define User Module States
   */
  .config(function($stateProvider) {
    $stateProvider
      /**
       * User: Abstract
       */
      .state( 'users', {
        url: '/users',
        abstract: true,
        templateUrl: 'app/unicorn/templates/page_content.html'
      })
      /**
       * User: List View
       */
      .state('users.list', require('./states/users.list'))
      /**
       * User: Create View
       */
      .state('users.create', require('./states/users.create'));
  });

});
