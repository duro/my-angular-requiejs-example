define(function(require, exports, module) {

  var usersCreate = module.exports = {
    url: '/create',
    views: {
      'pageContent': {
        templateUrl: 'app/users/templates/form.html'
      },
      'pageActions': {
        templateUrl: 'app/unicorn/templates/page_actions.html',
        controller: ['$scope', function($scope) {
          $scope.actions = [
            {id: 'create', title: 'Create New User', route: '/users/create', icon: 'user'},
            {id: 'cancel', title: 'Cancel', route: '/users', icon: 'remove-sign'}
          ];
        }]
      }
    },
    data:{ pageTitle: 'Create New User' }
  };

});
