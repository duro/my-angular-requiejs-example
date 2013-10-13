define(function(require, exports, module) {

  var usersList = module.exports = {

    /* --------------------------------------- */
    /* --( Users: List )-- */
    /* --------------------------------------- */

    url: '', // This will be the top-level route /users

    // Set global properties
    data:{ pageTitle: 'Users' },

    // Data to retrieve before we set views
    resolve: {
      users: ['Restangular', function(Restangular) {
        return Restangular.all('users').getList();
      }]
    },

    // View Configurations
    views: {

      /* --------------------------------------- */
      /* --( Page Actions )-- */
      /* --------------------------------------- */

      'pageActions': {
        templateUrl: 'app/unicorn/templates/page_actions.html',
        controller: ['$scope', function($scope) {
          $scope.actions = [
            {id: 'create', title: 'Create New User', route: '/users/create', icon: 'user'}
          ];
        }]
      },

      /* --------------------------------------- */
      /* --( Main Page Content )-- */
      /* --------------------------------------- */

      'pageContent': {
        templateUrl: 'app/users/templates/list.html',
        controller: [
          '$scope', 'users',
          function($scope, users){

            $scope.users = users;

            /* --------------------------------------- */
            /* --( Unicorn Grid Setup )-- */
            /* --------------------------------------- */

            $scope.gridConfig = {
              data: users,
              colDef: [
                {field:'firstName', displayName:'First Name', colClass: 'fname'},
                {field:'lastName', displayName:'Last Name', colClass: 'lname'},
                {field:'email', displayName:'Email Address', colClass: 'email'},
                {
                  displayName: 'Actions',
                  sortable: false,
                  colClass: 'actions',
                  cellTemplateUrl: 'app/users/templates/list.actions.html'
                }
              ]
            };

          }
        ]
      }
    }
  };

});
