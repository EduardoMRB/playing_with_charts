angular.module('phoneCountFilters', [])
  .filter('date', function () {
    return function (date) {
      return date.replace(/(\d{4})-(\d{2})-(\d{2})/, '$3/$2/$1');
    };
  });

var phoneCount = angular.module('phoneCount', ['ngRoute', 'phoneCountFilters']);

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
    $scope.events = [];

    $scope.addEvent = function (quantity, date) {
      $scope.events.push({ 
        quantity: quantity,
        date: date
      });
    };
  }]);
