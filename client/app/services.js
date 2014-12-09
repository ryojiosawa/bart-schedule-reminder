angular.module('bart-schedule-reminder.services', [])
  .factory('JobService', function ($http, $location) {
    var stations = stations = [
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
      {abbr: 'daly', name: 'Daly City'},
      {abbr: 'plza', name: 'El Cerrito Plaza'},
      {abbr: 'nbrk', name: 'North Berkeley'},
      {abbr: 'wcrk', name: 'Walnut Creek'},
      {abbr: 'frmt', name: 'Fremont'},
      {abbr: 'phil', name: 'Pleasant Hill'},
      {abbr: 'powl', name: 'Powell St. (SF)'},
      {abbr: 'ssan', name: 'South San Francisco'},
      {abbr: 'glen', name: 'Glen Park (SF)'},
      {abbr: 'mont', name: 'Montgomery St. (SF)'},
      {abbr: 'rich', name: 'Richmond'},
      {abbr: 'sfia', name: 'San Francisco Int\'l Airport'},
      {abbr: 'mlbr', name: 'Millbrae'},
      {abbr: 'dubl', name: 'Dublin/Pleasanton'},
      {abbr: 'pitt', name: 'Pittsburg/Bay Point'},
      {abbr: 'glen', name: 'Glen Park (SF)'}
    ];

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

    var getStationWithAbbr = function(abbr) {
      var name;
      stations.forEach(function(station) {
        if (station.abbr === abbr) {
          name = station.name;
        }
      });
      return name === undefined ? abbr: name;
    };

    var getStations = function() {
      return stations;
    };

    var getDirection = function(direction) {
      return direction === 'n' ? 'Northbound': 'Southbound';
    };

    return {
      getJobs: getJobs,
      addJob: addJob,
      getStations: getStations,
      getStationWithAbbr: getStationWithAbbr,
      getDirection: getDirection
    };
  });