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

    function isQuantityValid (quantity) {
      return /\d+/.test(quantity);
    }

    function isDateValid (date) {
      return /(\d{4})-(\d{2})-(\d{2})/.test(date);
    }

    function clearScopes () {
      $scope.quantity = '';
      $scope.date = '';
      $scope.error = '';
    }

    function dateExists(date) {
      var index;
      $scope.events.forEach(function (event, i) {
        if (event.date == date) index = i;
      });

      return index;
    }

    $scope.addEvent = function (quantity, date) {
      if (isQuantityValid(quantity) && isDateValid(date)) {
        var index = dateExists(date);

        if (index != undefined) {
          $scope.events[index].quantity += quantity;
        } else {
          $scope.events.push({ 
            quantity: quantity,
            date: date
          });
        }
        clearScopes();
      } else {
        $scope.error = 'Dados inválidos, verifique os campos do formulário';
      }
    };
  }]);
