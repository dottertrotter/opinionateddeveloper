angular.module('myApp.controllers', []).
  controller('MyCtrl1', ['$scope', '$http', '$sce',
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
  .controller('MyCtrl2', [function() {

  }]);