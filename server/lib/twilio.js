var accountSid = process.env.TWILIO_ACCOUNT_ID;
var authToken = process.env.AUTH_TOKEN;
var from = process.env.PHONE;
var helper = require('./helper');
var _ = require('underscore');

var client = require('twilio')(accountSid, authToken);

exports.sendText = function(job, estimates) {
  var body = 'Upcoming departures at ' + helper.getStationName(job.station) + ' \n';

  _.each(estimates, function(estimate) {
    var minutes = _.map(estimate.estimate, function(estimates) {
      return estimates.minutes[0] === 'Leaving' ? 'now': estimates.minutes[0];
    });
    body += estimate.destination[0] + 'in (' + minutes.join(', ') + ' ) mins\n';
  });

  return client.messages.create({ to: job.phone, from: from, body: body });
};