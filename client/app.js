angular.module('bart-schedule-reminder', [
  'bart-schedule-reminder.jobs',
  'bart-schedule-reminder.newjob',
  'bart-schedule-reminder.services',
  'ngRoute'
  ])
  .config(function($routeProvider, $httpProvider) {
    $routeProvider
      .when('/jobs', {
        templateUrl: 'app/jobs.html',
        controller: 'JobsController'
      })
      .when('/newjob', {
        templateUrl: 'app/newjob.html',
        controller: 'NewJobController'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
