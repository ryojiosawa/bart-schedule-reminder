var handler = require('./job-controller');
var helper = require('../lib/helper');

module.exports = function (app) {
  app.route('/')
    .get(handler.getJobs)
    .post(handler.createJob);
  app.route('/:id')
    .get(helper.invalidMethodHandler)
    .delete(handler.deleteJob);
};