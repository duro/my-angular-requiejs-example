define(function(require, exports, module) {
  'use strict';

  // Load Dependencies
  var angular = require('angular')
    , _       = require('underscore');

  // Load Angular Modules
  require('templates');
  require('restangular');
  require('ui.utils');
  require('ui.router');
  require('unicorn/main-nav/main-nav');
  require('users/users');

  // Define Application Module
  var app = module.exports.app = angular.module('nodegigs', [
    // Define dependencies
    'templates-app',
    'restangular',
    'ui.router',
    'unicorn.mainNav',
    'nodegigs.users'
  ])

  // Initialization Function
  .run(function ($rootScope, $state, $stateParams) {
    // Mirror $state and $stateParams onto the rootScope
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
  })

  // Configure Application
  .config(function ($urlRouterProvider, RestangularProvider) {
    // Set default route
    $urlRouterProvider.otherwise( '/users' );

    // Restangular Config
    RestangularProvider.setBaseUrl('/api');
    RestangularProvider.setRestangularFields({id: "_id"});
  })

  // Create top-level application controller
  .controller('AppCtrl', function ($scope, $location) {

    // Listen for state changes and parse state data
    $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){

      // Page title
      if (angular.isDefined(toState.data.pageTitle)) {
        $scope.pageTitle = $scope.contentTitle = toState.data.pageTitle;
      }

      // Content title
      if (angular.isDefined( toState.data.contentTitle)) {
        $scope.contentTitle = toState.data.contentTitle;
      }

    });

  });

});
