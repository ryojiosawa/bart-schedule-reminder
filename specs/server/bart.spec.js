var request = require('supertest');
var expect = require('chai').expect;
var bart = require('../../server/lib/bart');

describe('bart.fetchDepartureInfo', function(done) {

  it('should return real-time departure time for a given station', function(){
    var job = {
      station: "powl",
      destination: "rich",
      direction: "n"
    };

    bart.fetchDepartureInfo(job.station, job.direction, job.destination, function (estimates) {
      console.log('estimates', estimates);
      done();
    });
  });
});
