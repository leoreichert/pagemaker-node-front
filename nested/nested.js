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
						style: "default",
						visible: true
					},
					{
						description: "Tamanho",
						value: "10",
						style: "default",
						visible: true
					}]
            },
			{
                name: 'Imagem',
                type: "img",
                fields: [{
						description: "Arquivo",
						value: "",
						style: "search",
						visible: true
					},
					{
						description: "Altura",
						value: "200",
						style: "default",
						visible: true
					},
					{
						description: "Largura",
						value: "200",
						style: "default",
						visible: true
					},
					{
						description: "Link",
						value: "",
						style: "default",
						visible: true
					}]
            },
            {
                name: 'Container 1',
                type: "container",
				fields: [{
						description: "Título",
						value: "",
						style: "default",
						visible: true
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
						style: "default",
						visible: true
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
						style: "default",
						visible: true
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
	
	$scope.carregarBase64 = function () {
		var tmppath = event.target.files[0];
		var reader = new FileReader();
		reader.readAsDataURL(tmppath);
		reader.onload = function () {
			console.log(reader.result);
			$scope.models.selected.fields[0].value = reader.result;
		};
		reader.onerror = function (error) {
			console.log('Error: ', error);
		};
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