angular.module('myApp.controllers', []).
controller('Posts', ['$scope', '$http', '$sce',
	function($scope, $http, $sce) {
		$http.get("/post-list", {})
		.success(function(data, status, headers, config) {
			//console.log(data);
			for(var i = 0; i < data.length; i++){
				data[i].post = $sce.trustAsHtml(data[i].post);
			}
			$scope.posts = data;
		}).error(function(data, status, headers, config) {
			console.log('failed');
		});
}])
.controller('Post', ['$scope', '$routeParams', '$http', '$sce',
	function($scope, $routeParams, $http, $sce) {
		$http.get('post/' + $routeParams.name).success(function(data) {
	      data.post = $sce.trustAsHtml(data.post);
	      $scope.post = data;
	    });
	}]);