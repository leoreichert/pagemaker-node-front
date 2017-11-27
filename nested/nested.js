/**
 * The controller doesn't do much more than setting the initial data model
 */
angular.module("demo").controller("NestedListsController", ['$scope', '$rootScope', '$http', '$routeParams', function ($scope, $rootScope, $http, $routeParams) {
	modelsNull = {
        selected: null,
		uid: "",
        templates: [{
                name: 'Rótulo',
                type: "label",
				id: 1,
				fields: [{
						description: "Texto",
						value: ""
					}]
            },
            {
                name: 'Texto',
                type: "text",
				id: 2,
				fields: [{
						description: "Texto",
						value: ""
					}]
            },
            {
                name: 'Botão',
                type: "button",
				id: 3,
                fields: [{
						description: "Texto",
						value: ""
					}]
            },
			{
                name: 'Imagem',
                type: "img",
                fields: [{
						description: "Caminho",
						value: "nested/teste.jpg"
					},
					{
						description: "Link",
						value: "http://www.google.com"
					}]
            },
            {
                name: 'Container 1',
                type: "container",
				id: 4,
				fields: [{
						description: "Título",
						value: ""
					}],
                columns: [
                    []
                ]
            },
            {
                name: 'Container 2',
                type: "container",
				id: 5,
				fields: [{
						description: "Título",
						value: ""
					}],
                columns: [
                    [],
                    []
                ]
            },
            {
                name: 'Container 3',
                type: "container",
				id: 6,
				fields: [{
						description: "Título",
						value: ""
					}],
                columns: [
                    [],
                    [],
                    []
                ]
            },
            {
                name: 'Container 4',
                type: "container",
				id: 7,
				fields: [{
						description: "Título",
						value: ""
					}],
                columns: [
                    [],
                    [],
                    [],
                    []
                ]
            },
        ],
        dropzones: {
            "Principal": [],
        }
    };
	console.log(window.location.hostname);
	
	
	if ($routeParams.uid != undefined) {
		var req = {
				method: 'GET',
				url: 'http://localhost:8080/GetTemplate?uid=' + $routeParams.uid,
			}
			$http(req).then(function(response){
				console.log(response.data);
				if ((response.data != 'none') && (response.data != '') && (response.data != null) && (response.data != '') && (response.data != undefined)) {
					$scope.models = response.data;
				} else {
					$scope.models = modelsNull;
					$scope.models.uid = $routeParams.uid;
				}
			}, function(response){
				$scope.models = modelsNull;
				$scope.models.uid = $routeParams.uid;
			});
	} else {
		$scope.models = modelsNull;
	}

    if (angular.isObject($rootScope.models.dropzones)) {
        $scope.models.dropzones = angular.copy($rootScope.models.dropzones);
    }

    $scope.salvar = function () {
        $rootScope.models = angular.copy($scope.models);
		var modelString = JSON.stringify($scope.models);
		var req = {
			method: 'POST',
			url: 'http://localhost:8080/UpdateTemplate?uid=' + $rootScope.models.uid,
			headers: {
				'Content-Type': "application/json"
			},
			data: modelString
		}
		$http(req).then(function(){
		}, function(){
		});
	};
}]);

angular.module("demo").controller("NestedListsControllerVis", ['$scope', '$rootScope', '$http', '$routeParams', '$interval', function ($scope, $rootScope, $http, $routeParams, $interval) {
	if ($routeParams.uid != undefined) {
		var req = {
				method: 'GET',
				url: 'http://localhost:8080/GetTemplate?uid=' + $routeParams.uid,
			}
			$http(req).then(function(response){
				console.log(response);
				if ((response.data.resposta != 'none') && (response.data.resposta != '') && (response.data != null) && (response.data != '') && (response.data != undefined)) {
					$scope.models = response.data;
				} else {
					$scope.models = angular.copy($rootScope.models);
					$scope.models.uid = $routeParams.uid;
				}
			}, function(response){
				$scope.models = angular.copy($rootScope.models);
				$scope.models.uid = $routeParams.uid;
			});
	} else {
		$scope.models = angular.copy($rootScope.models);
	}
	
	$interval(function () {
		var req = {
			method: 'POST',
			url: 'http://localhost:8080/AccessBeacon?uid=' + $scope.models.uid
		}
		$http(req).then(function(){
		}, function(){
		});
	}, 10000);
}]);