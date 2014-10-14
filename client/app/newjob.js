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

    $scope.stations = [
      {abbr: '12th', name: '12th St. Oakland City Center'},
      {abbr: '16th', name: '16th St. Mission (SF)'},
      {abbr: '19th', name: '19th St. Oakland'},
      {abbr: '24th', name: '24th St. Mission (SF)'},
      {abbr: 'ashb', name: 'Ashby (Berkeley)'},
      {abbr: 'balb', name: 'Balboa Park (SF)'},
      {abbr: 'bayf', name: 'Bay Fair (San Leandro)'},
      {abbr: 'cast', name: 'Castro Valley'},
      {abbr: 'civc', name: 'Civic Center (SF)'},
      {abbr: 'cols', name: 'Coliseum/Oakland Airport'},
      {abbr: 'embr', name: 'Embarcadero (SF)'},
      {abbr: 'powl', name: 'Powell St. (SF)'}
    ];
  });