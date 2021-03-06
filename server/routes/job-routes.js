var handler = require('./../controllers/job-controller');

module.exports = function (app) {
  app.route('/:id')
    .get(handler.getJob)
    .post(handler.updateJob)
    .delete(handler.deleteJob);
  app.route('/')
    .get(handler.getJobs)
    .post(handler.createJob);
};