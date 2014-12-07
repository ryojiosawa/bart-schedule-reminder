var express = require('express');
var morgan = require('morgan'); // used for logging incoming request
var bodyParser = require('body-parser');
var partials = require('express-partials');
var handler = require('./lib/request-handler');

module.exports = function (app, express) {
  app.use(morgan('dev'));
  app.use(partials());
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  app.use(express.static(__dirname + '/../client'));
  /*app.use(express.cookieParser('shhhh, very secret'));
   app.use(express.session());*/

  // Error handling middleware
  app.use(handler.errorLogger);
  app.use(handler.errorHandler);

  var jobRouter = express.Router();
  require('./jobs/job-routes.js')(jobRouter);
  app.use('/jobs', jobRouter);

  app.get('/', handler.getJobs);
};