var db = require('./db-config'); // this is needed in order for worker to access MongoDB
var async = require('async');
var bart = require('./lib/bart');
var twilio = require('./lib/twilio');
var fetchJobs = require('./jobs/job-controller').fetchJobs;
var _ = require('underscore');

fetchJobs()
  .then(function(jobs) {
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
              return estimate.minutes[0] === 'Leaving' ? 'now': estimate.minutes[0];
            });

            console.log('estimates', minutes);
            twilio.sendText(job, minutes)
             .then(function(message) {
                console.log(message.sid);
                done();
              }, function(err) {
                done(err);
              });
          }
      });
    });
  }, function(err) {
    console.log(err);
    process.exit(0);
  });