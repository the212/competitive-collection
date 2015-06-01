angular.module('compService', [])

	.factory('Tweets', ['$http',function($http) {
		return {
			get : function() {
				return $http.get('/api/tweets');
			}
		}
	}]);