angular.module('loc8rApp', [
  'ui.router',
  'ngSanitize',
  'ui.bootstrap'
]).config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {
  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'home/home.template.html',
      controller: 'HomeController'
    })
    .state('about', {
      url: '/about',
      templateUrl: 'about/about.template.html',
      controller: 'AboutController'
    });
  $urlRouterProvider.otherwise('/');
  // $locationProvider.html5Mode(true);
}])
