var express = require('express');
var app = express();
require('./server/server-config.js')(app, express);
require('./server/db-config.js');

var port = process.env.PORT || 8000;
app.listen(port);

console.log('Server now listening on port ' + port);

module.exports = app;