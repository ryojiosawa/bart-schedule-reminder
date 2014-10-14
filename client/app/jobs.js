angular.module('bart-schedule-reminder.jobs', [])
  .controller('JobsController', function($scope, $location, JobService) {
    $scope.data = {};

    $scope.getJobs = function() {
      JobService.getJobs()
        .then(function(jobs) {
          $scope.data.jobs = jobs;
          //$location.path('/links');
        })
        .catch(function (error) {
          console.error(error);
        });
    };

    $scope.getJobs();
  });
