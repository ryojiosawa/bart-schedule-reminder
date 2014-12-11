var db = require('./db-config');
var async = require('async');
var bart = require('./lib/bart');
var twilio = require('./lib/twilio');
var JobCtrl = require('./jobs/job-controller');
var _ = require('underscore');

JobCtrl.fetchJobs(function(jobs) {
  async.each(jobs, function(job, done) {
    bart.fetchDepartureInfo(job.station, job.direction, job.destination)
      .then(function(json) {

        var dest = job.destination.toUpperCase();
        var estimates = _.filter(json.root.station[0].etd, function (estimate) {
          if (estimate.abbreviation[0] === dest) {
            return estimate.estimate;
          }
        });

        if (estimates && estimates[0] && estimates[0].estimate) {
          estimates = estimates[0].estimate;
          var minutes = _.map(estimates, function (estimate) {
            return estimate.minutes[0];
          });

          console.log('estimates', estimates);
          //twilio.sendText(job, estimates, done);
        }
    });
  }, function(err) {
    if (err) console.error(err);

    process.exit(0);
  });
});