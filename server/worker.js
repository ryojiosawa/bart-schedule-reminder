var db = require('./db-config');
var _ = require('underscore');
var bart = require('./lib/bart');
var twilio = require('./lib/twilio');
var JobCtrl = require('./jobs/jobController');

JobCtrl.fetchJobs(function(jobs) {
  _.each(jobs, function(job) {

    bart.fetchDepartureInfo(job.station, job.direction, job.destination, function (estimates) {
      console.log('estimates', estimates);
      twilio.sendText(job.phone, job.destination, estimates, function() {
        process.exit(0);
      });
    });
  });
});
