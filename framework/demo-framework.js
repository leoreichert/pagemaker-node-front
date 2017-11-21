angular.module("demo", ["ngRoute", "dndLists"])
    .config(function ($routeProvider) {
        $routeProvider
			.when('/', {
                templateUrl: '/nested/nested.html',
                controller: 'NestedListsController'
            })
            .when('/:uid', {
                templateUrl: '/nested/nested.html',
                controller: 'NestedListsController'
            })
            .when('/:uid/vis/', {
                templateUrl: '/nested/vis.html',
                controller: 'NestedListsControllerVis'
            })
            .otherwise({
                redirectTo: '/'
            });
    }).run(['$rootScope', function ($rootScope) {
        $rootScope.models =  {};
    }]);