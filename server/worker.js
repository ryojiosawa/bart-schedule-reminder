var db = require('./db-config'); // this is needed in order for worker to access MongoDB
var async = require('async');
var bart = require('./lib/bart');
var twilio = require('./lib/twilio');
var fetchJobs = require('./jobs/job-controller').fetchJobs;

fetchJobs()
  .then(function(jobs) {
    async.each(jobs, function(job, done) {
      bart.fetchDeparatureEstimates(job.station, job.direction)
        .then(function(estimates) {
          //console.log('estimates', estimates);

          twilio.sendText(job, estimates)
            .then(function(message) {
              console.log(message.sid);
              done();
            }, function(err) {
              done(err);
            });
      });
    }, function(err) {
      if (err) { console.log(err); }

      process.exit(0);  // ensure to terminate the process when an error occurs
    });
  }, function(err) {
    console.log(err);
    process.exit(0);
  });