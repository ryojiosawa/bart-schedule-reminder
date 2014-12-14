var request = require('supertest');
var expect = require('chai').expect;
var bart = require('../../server/lib/bart');

describe('bart.fetchDeparatureEstimates', function() {

  it('should return real-time departure time for a given station', function(){
    var job = {
      station: "powl",
      destination: "rich",
      direction: "n"
    };

    bart.fetchDeparatureEstimates(job.station, job.direction, job.destination)
      .then(function(estimates) {
        console.log('estimates', estimates);
        done();
      });
  });
});