var db = require('../db-config');
var Job = require('../jobs/jobModel');

module.exports = {
  createJob: function(req, res) {
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
  },

  getJobs: function(req, res) {
    Job.find()
      .exec(function(err, jobs) {
        if (err) {
          res.send(500, err);
        } else {
          res.send(200, jobs);
        }
      });
  },

  deleteJob: function(req, res) {
    console.log('req.params', req.params);
    Job.remove({ _id: req.params.id })
      .exec(function(err, jobs) {
        if (err) {
          res.send(500, err);
        } else {
          res.send(200, { message: 'Successfully deleted' });
        }
      });
  }
};