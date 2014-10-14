angular.module('bart-schedule-reminder.services', [])

  .factory('JobService', function ($http, $location) {
    var getJobs = function() {
      return $http({
        method: 'GET',
        url: '/jobs'
      })
      .then(function (resp) {
        return resp.data;
      });
    };

    var addJob = function(job) {
      return $http({
        method: 'POST',
        url: '/jobs',
        data: job
      })
      .then(function (resp) {
        $location.path('/jobs');
      });
    };

    return {
      getJobs: getJobs,
      addJob: addJob
    };
  })