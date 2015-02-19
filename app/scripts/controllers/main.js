'use strict';

/**
 * @ngdoc function
 * @name mycsExerciseYeomanApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the mycsExerciseYeomanApp
 */
angular.module('mycsExerciseYeomanApp')
  .controller('MainCtrl', ['$scope', '$log', '$q', 'MetricsStats', function ($scope, $log, $q, MetricsStats) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    function buildTableData(data) { // Build tableDataMin and tableDataMax arrays
      var performanceData_mycs_com = data.mycs_com,
        performanceData_mycs_io = data.mycs_io,
        tableDataMin = [], tableDataMax = [], property, mycs_comProperty, mycs_ioProperty;

      for (property in performanceData_mycs_com) {
        if (performanceData_mycs_com.hasOwnProperty(property)) {

          mycs_comProperty = performanceData_mycs_com[property];
          mycs_ioProperty = performanceData_mycs_io[property];

          // tableDataMin
          if (mycs_comProperty.min < mycs_ioProperty.min) {
            tableDataMin.push({
              variable: property,
              value: mycs_comProperty.min,
              average: mycs_comProperty.average,
              website: 'www.mycs.com'
            });
          } else if (mycs_comProperty.min > mycs_ioProperty.min) {
            tableDataMin.push({
              variable: property,
              value: mycs_ioProperty.min,
              average: mycs_ioProperty.average,
              website: 'www.mycs.io'
            });
          } else if (mycs_comProperty.min === mycs_comProperty.min && mycs_comProperty.min !== 0) {
            tableDataMin.push({
              variable: property,
              value: mycs_comProperty.min,
              average: '-',
              website: 'both'
            });
          }

          // tableDataMax
          if (mycs_comProperty.max > mycs_ioProperty.max) {
            tableDataMax.push({
              variable: property,
              value: mycs_comProperty.max,
              average: mycs_comProperty.average,
              website: 'www.mycs.com'
            });
          } else if (mycs_comProperty.max < mycs_ioProperty.max) {
            tableDataMax.push({
              variable: property,
              value: mycs_ioProperty.max,
              average: mycs_ioProperty.average,
              website: 'www.mycs.io'
            });
          } else if (mycs_comProperty.max === mycs_comProperty.max && mycs_comProperty.max !== 0) {
            tableDataMax.push({
              variable: property,
              value: mycs_comProperty.max,
              average: '-',
              website: 'both'
            });
          }

        }
      }

      return [tableDataMin, tableDataMax];
    }

    $q.all(MetricsStats).then(function(data) { // When all promises have been resolved
      var tableData = buildTableData(data);
      $scope.tableDataMin = tableData[0];
      $scope.tableDataMax = tableData[1];

      $scope.data = {
        tableData: tableData[1]
      };
    });

  }]);
