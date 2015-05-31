angular.module('compController', [])

	.controller('mainController', ['$scope','$http','Todos', function($scope, $http, Todos) {
		$scope.loading = true;

		// GET =====================================================================
		Todos.get()
			.success(function(data) {
				$scope.todos = data;
				$scope.loading = false;
			});

	}]);