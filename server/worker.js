var db = require('./db-config');
var async = require('async');
var bart = require('./lib/bart');
var twilio = require('./lib/twilio');
var JobCtrl = require('./jobs/job-controller');

JobCtrl.fetchJobs(function(jobs) {
  async.each(jobs, function(job, done) {
    bart.fetchDepartureInfo(job.station, job.direction, job.destination, function (estimates) {
      console.log('estimates', estimates);
      twilio.sendText(job, estimates, done);
    });
  }, function(err) {
    if (err) console.error(err);

    process.exit(0);
  });
});