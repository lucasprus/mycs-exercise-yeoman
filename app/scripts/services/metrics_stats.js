'use strict';

/**
 * @ngdoc service
 * @name mycsExerciseYeomanApp.MetricsStats
 * @description 
 * # MetricsStats
 * Service in the mycsExerciseYeomanApp.
 */
angular.module('mycsExerciseYeomanApp')
  .factory('MetricsStats', ['$http', '$log', function ($http, $log) {

    function metricsStatsPromise(name) {
      return $http.get('/performance_data/' + name + '.json')
        .then(function(data) {
          $log.log('Successfully fetched ' + name + ' performance data', data);
          return data.data.stats;
        }, function() {
          $log.error('Error occured when fetching ' + name + ' performance data');
        });
    }

    return {
      mycs_com: metricsStatsPromise('mycs_com'),
      mycs_io: metricsStatsPromise('mycs_io')
    };

  }]);
