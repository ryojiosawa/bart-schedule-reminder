angular.module('bart-schedule-reminder.newjob', [])

  .controller('NewJobController', function ($scope, $location, JobService) {
    $scope.job = {};
    $scope.addJob = function() {
      JobService.addJob($scope.job)
        .then(function() {
          $location.path('/jobs');
        })
        .catch(function(error) {
          console.error(error);
        });
    };
  });