var express = require('express');
var morgan = require('morgan'); // used for logging incoming request
var bodyParser = require('body-parser');
var partials = require('express-partials');
var handler = require('./lib/request-handler');

var app = express();

// Express 4 allows us to use multiple routers with their own configurations
/*  var userRouter = express.Router();
  var linkRouter = express.Router();*/

app.use(morgan('dev'));
app.use(partials());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/../client'));
/*app.use(express.cookieParser('shhhh, very secret'));
app.use(express.session());*/

app.get('/', function(req, res) {
  res.end('hello!');
});

app.get('/jobs', handler.getJobs);
app.post('/jobs', handler.saveJob);

module.exports = app;