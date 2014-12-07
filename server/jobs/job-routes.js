var handler = require('../lib/request-handler');

module.exports = function (app) {
  app.route('/')
    .get(handler.getJobs)
    .post(handler.saveJob);
  app.route('/:id')
    .delete(handler.deleteJob);
};