var Job = require('./../models/job-model');

module.exports = {
  createJob: function(req, res, next) {
    var job = new Job({
      phone: req.body.phone,
      station: req.body.station,
      direction: req.body.direction
    });

    job.save(function(err, newJob) {
      if (err) {
        return next(err);
      }

      res.status(201).send(newJob);
    });
  },

  updateJob: function(req, res, next) {
    Job.findOneAndUpdate({ _id: req.params.id }, req.body, { upsert: true })
      .exec()
      .then(function(job) {
        res.status(200).send(job);
      }, function(err) {
        return next(err);
      }
    );
  },

  getJob: function(req, res, next) {
    Job.findOne({ _id: req.params.id })
      .exec()
      .then(function(job) {
        res.status(200).send(job);
      }, function(err) {
        next(err);
      });
  },

  getJobs: function(req, res, next) {
    Job.find()
      .exec(function(err, jobs) {
        if (err) {
          next(err);
        }

        res.status(200).send(jobs);
      });
  },

  deleteJob: function(req, res, next) {
    Job.remove({ _id: req.params.id })
      .exec(function(err) {
        if (err) {
          next(err);
        }

        res.status(200).send({ message: 'Successfully deleted' });
      });
  },

  fetchJobs: function() {
    return Job.find({}).exec();
  }
};