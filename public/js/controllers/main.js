angular.module('compController', [])

	.controller('mainController', ['$scope','$http','Tweets', function($scope, $http, Tweets) {
		$scope.loading = true;

		// GET =====================================================================
		Tweets.get()
			.success(function(data) {
				console.log("got tweets!! ", data);
				$scope.tweets = data;
				$scope.loading = false;
			});

	}]);