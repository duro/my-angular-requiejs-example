require.config({
  paths: {
    'angular'       : '../vendor/angular/angular',
    'jquery'        : '../vendor/jquery/jquery',
    'ui.router'     : '../vendor/angular-ui-router/release/angular-ui-router',
    'ui.utils'      : '../vendor/angular-ui-utils/components/angular-ui-docs/build/ui-utils',
    'ngGrid'        : '../vendor/angular-ui-ng-grid/build/ng-grid',
    'angular-mocks' : '../vendor/angular-mocks/angular-mocks',
    'underscore'    : '../vendor/lodash/dist/lodash.underscore',
    'restangular'   : '../vendor/restangular/dist/restangular',
    'templates-app' : '../templates/templates-app',
    'bootstrap'     : '../vendor/bootstrap-sass/dist/js/bootstrap'
  },
  baseUrl: 'app',
  shim: {
    'angular'       : {exports  : 'angular'},
    'jquery'        : {exports  : 'jQuery'},
    'restangular'   : ['angular', 'underscore'],
    'bootstrap'     : ['jquery'],
    'angular-mocks' : ['angular'],
    'ngGrid'        : ['angular'],
    'ui.utils'      : ['angular'],
    'ui.router'     : ['angular']
  },
  priority: [
    "angular"
  ]
});
