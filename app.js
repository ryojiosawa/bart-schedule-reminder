var twilio = require('./server/lib/twilio');
var bart = require('./server/lib/bart');

bart.fetchDepartureInfo('powl', 'n', 'RICH', function(estimates) {
  twilio.sendText('415-724-9329', 'RICH', estimates);
});

