var Job = require('./job-model');

module.exports = {
  createJob: function(req, res, next) {
    var job = new Job({
      phone: req.body.phone,
      station: req.body.station,
      destination: req.body.destination,
      direction: req.body.direction
    });

    job.save(function(err, newJob) {
      if (err) {
        next(err);
      }

      res.send(200, newJob);
    });
  },

  getJobs: function(req, res, next) {
    Job.find()
      .exec(function(err, jobs) {
        if (err) {
          next(err);
        }

        res.send(200, jobs);
      });
  },

  deleteJob: function(req, res, next) {
    Job.remove({ _id: req.params.id })
      .exec(function(err) {
        if (err) {
          next(err);
        }

        res.send(200, { message: 'Successfully deleted' });
      });
  },

  fetchJobs: function (cb) {
    Job.find()
      .exec(function(err, jobs) {
        if (err) throw err;

        cb(jobs);
      });
  }
};
