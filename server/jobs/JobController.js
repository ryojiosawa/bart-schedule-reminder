var Job = require('./jobModel');

exports.fetchJobs = function (cb) {
  Job.find()
    .exec(function(err, jobs) {
      if (err) throw err;

      cb(jobs);
    });
};
