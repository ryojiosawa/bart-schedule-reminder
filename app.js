var twilio = require('./lib/twilio');
var bart = require('./lib/bart');

bart.fetchDepartureInfo('powl', 'n', 'RICH', function(estimates) {
  twilio.sendText('415-724-9329', 'RICH', estimates);
});

