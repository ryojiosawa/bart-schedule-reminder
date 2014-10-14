angular.module('bart-schedule-reminder', [
  'bart-schedule-reminder.jobs',
  'ngRoute'
  ])
  .config(function($routeProvider, $httpProvider) {
    $routeProvider
      .when('/jobs', {
        templateUrl: 'app/jobs.html',
        controller: 'JobsController'
      })
      .otherwise({
        redirectTo: '/jobs'
      });
  });
