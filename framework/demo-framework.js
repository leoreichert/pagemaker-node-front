angular.module("demo", ["ngRoute", "dndLists"])
    .config(function ($routeProvider) {
        $routeProvider
			.when('/', {
                templateUrl: '/nested/nested.html',
                controller: 'NestedListsController',
				title: 'Page Maker'
            })
            .when('/:uid', {
                templateUrl: '/nested/nested.html',
                controller: 'NestedListsController',
				title: 'Page Maker'
            })
            .when('/:uid/vis/', {
                templateUrl: '/nested/vis.html',
                controller: 'NestedListsControllerVis',
				title: 'Page'
            })
			.when('/:uid/test/', {
                templateUrl: '/nested/vis.html',
                controller: 'NestedListsControllerTes',
				title: 'Page Test'
            })
            .otherwise({
                redirectTo: '/'
            });
    }).run(['$rootScope', '$route', '$routeParams', function ($rootScope, $route, $routeParams) {
		$rootScope.$on('$routeChangeSuccess', function() {
			document.title = $route.current.title + ' ' + $routeParams.uid;
		});
        $rootScope.models =  {};
    }]);