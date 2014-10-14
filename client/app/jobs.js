angular.module('bart-schedule-reminder.jobs', [])
  .controller('JobsController', function($scope, $location, JobService) {
    $scope.data = {};

    $scope.getJobs = function() {
      JobService.getJobs()
        .then(function(jobs) {
          $scope.data.jobs = jobs;
        })
        .catch(function (error) {
          console.error(error);
        });
    };

    $scope.getJobs();
  }).filter('displayStation', function(JobService) {
    return function(abbr) {
      return JobService.getStationWithAbbr(abbr);
    };
  }).filter('displayDirection', function(JobService) {
    return function(direction) {
      return JobService.getDirection(direction);
    };
  });
