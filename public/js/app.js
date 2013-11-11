// Declare app level module which depends on filters, and services
angular.module('myApp', [
  'ngRoute',
  'myApp.controllers'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/posts', {templateUrl: 'partials/posts.html', controller: 'Posts'});
  $routeProvider.when('/post/:name', {templateUrl: 'partials/post.html', controller: 'Post'});
  $routeProvider.otherwise({redirectTo: '/posts'});
}]);