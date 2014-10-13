/*
var twilio = require('./server/lib/twilio');
var bart = require('./server/lib/bart');

bart.fetchDepartureInfo('powl', 'n', 'RICH', function(estimates) {
  twilio.sendText('415-724-9329', 'RICH', estimates);
});

*/
var app = require('./server/server-config.js');

var port = process.env.PORT || 8000;
app.listen(port);

console.log('Server now listening on port ' + port);

// export our app for testing and flexibility, required by index.js
module.exports = app;