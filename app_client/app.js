angular.module('loc8rApp', [
  'ui.router'
]).config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'home/home.template.html',
      controller: 'HomeController'
    });
  $urlRouterProvider.otherwise('/');
}])
