angular.module('bart-schedule-reminder.jobs', [])
  .controller('JobsController', function($scope) {
    $scope.jobs = [
      {phone: '111-111-1111'},
      {phone: '222-222-2222'}
    ];
  });
