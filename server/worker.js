var db = require('./db-config');
var async = require('async');
var bart = require('./lib/bart');
var twilio = require('./lib/twilio');
var JobCtrl = require('./jobs/jobController');

JobCtrl.fetchJobs(function(jobs) {

  async.each(jobs, function(job, done) {
    bart.fetchDepartureInfo(job.station, job.direction, job.destination, function (estimates) {
      console.log('estimates', estimates);
      twilio.sendText(job.phone, job.destination, estimates, done);
    });
  }, function(err) {
    if (err) console.error(err);

    process.exit(0);
  });

});
