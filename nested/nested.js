angular.module("demo").controller("NestedListsController", ['$scope', '$rootScope', '$http', '$routeParams', function ($scope, $rootScope, $http, $routeParams) {
	modelsNull = {
        selected: null,
		uid: "",
        templates: [{

                name: 'Rótulo',
                type: "label",
				fields: [{
						description: "Texto",
						value: "Texto Inicial",
						style: "default"
					},
					{
						description: "Tamanho",
						value: "10",
						style: "default"
					}]
            },
			{
                name: 'Imagem',
                type: "img",
                fields: [{
						description: "Caminho",
						value: "",
						style: "search"
					},
					{
						description: "Altura",
						value: "200",
						style: "default"
					},
					{
						description: "Largura",
						value: "200",
						style: "default"
					},
					{
						description: "Link",
						value: "",
						style: "default"
					}]
            },
            {
                name: 'Container 1',
                type: "container",
				style: "default",
				fields: [{
						description: "Título",
						value: "",
						style: "default"
					}],
                columns: [
                    []
                ]
            },
            {
                name: 'Container 2',
                type: "container",
				style: "default",
				fields: [{
						description: "Título",
						value: "",
						style: "default"
					}],
                columns: [
                    [],
                    []
                ]
            },
            {
                name: 'Container 3',
                type: "container",
				style: "default",
				fields: [{
						description: "Título",
						value: "",
						style: "default"
					}],
                columns: [
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
	
	if ($routeParams.uid != undefined) {
		var req = {
				method: 'GET',
				url: 'https://beacon-mapper.herokuapp.com/GetTemplate?uid=' + $routeParams.uid,
			}
			$http(req).then(function(response){
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
			url: 'https://beacon-mapper.herokuapp.com/UpdateTemplate?uid=' + $rootScope.models.uid,
			headers: {
				'Content-Type': "application/json"
			},
			data: modelString
		}
		$http(req).then(function(){
		}, function(){
		});
	};
	$scope.title = "Maker"
}]);

angular.module("demo").controller("NestedListsControllerVis", ['$scope', '$rootScope', '$http', '$routeParams', '$interval', function ($scope, $rootScope, $http, $routeParams, $interval) {
	if ($routeParams.uid != undefined) {
		var req = {
				method: 'GET',
				url: 'https://beacon-mapper.herokuapp.com/GetTemplate?uid=' + $routeParams.uid,
			}
			$http(req).then(function(response){
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
	
	$scope.title = "routeParams.uid"
	
	$interval(function () {
		var req = {
			method: 'POST',
			url: 'https://beacon-mapper.herokuapp.com/AccessBeacon?uid=' + $scope.models.uid
		}
		$http(req).then(function(){
		}, function(){
		});
	}, 10000);
}]);


angular.module("demo").controller("NestedListsControllerTes", ['$scope', '$rootScope', '$http', '$routeParams', function ($scope, $rootScope, $http, $routeParams) {
	if ($routeParams.uid != undefined) {
		var req = {
				method: 'GET',
				url: 'https://beacon-mapper.herokuapp.com/GetTemplate?uid=' + $routeParams.uid,
			}
			$http(req).then(function(response){
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
	
	$scope.title = "Test routeParams.uid"
}]);