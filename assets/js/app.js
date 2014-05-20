var phoneCount = angular.module('phoneCount', ['ngRoute']);

phoneCount.config(['$routeProvider',
  function ($routeProvider) {
    $routeProvider.
      when('/add', {
        templateUrl: 'partials/add.html',
        controller: 'AddCtrl'
      }).
      when('/chart', {
        templateUrl: 'partials/chart.html',
        controller: 'ChartCtrl'
      }).
      otherwise({
        redirectTo: '/'
      });
  }]);

phoneCount.controller('AddCtrl', ['$scope', '$routeParams', 
  function ($scope, $routeParams) {
        
  }]);
