angular.module('loc8rApp', [
  'ui.router'
]).config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {
  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'home/home.template.html',
      controller: 'HomeController'
    });
  $urlRouterProvider.otherwise('/');
  $locationProvider.html5Mode(true);
}])
