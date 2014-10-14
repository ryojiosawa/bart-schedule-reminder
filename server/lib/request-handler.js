var db = require('../db-config');
var Job = require('../jobs/jobModel');

exports.saveJob = function(req, res) {
  var job = new Job({
    phone: req.body.phone,
    station: req.body.station,
    destination: req.body.destination,
    direction: req.body.direction
  });

  job.save(function(err, newJob) {
    if (err) {
      res.send(500, err);
    } else {
      res.send(200, newJob);
    }
  });
};

exports.getJobs = function(req, res) {

  Job.find()
    .exec(function(err, jobs) {
      if (err) {
        res.send(500, err);
      } else {
        res.send(200, jobs);
      }
    });
};
