var _ = require('underscore');
var accountSid = process.env.TWILIO_ACCOUNT_ID;
var authToken = process.env.AUTH_TOKEN;
var from = process.env.PHONE;
var helper = require('./helper');

//require the Twilio module and create a REST client
var client = require('twilio')(accountSid, authToken);

exports.sendText = function(job, minutes, done) {

  minutes = _.map(minutes, function(minute) {
    return minute === 'Leaving' ? 'now' : minute;
  });

  var body = 'Your train (' + helper.getStationName(job.destination) + ') ' +
        'is arriving at ' + helper.getStationName(job.station) +
        ' station in ' +
        minutes.join(', ') + ' minutes.';

  var message = {
    to: job.phone,
    from: from,
    body: body
  };

  client.messages.create(message, function(err, message) {
    if (err) {
      console.error(err);
    } else {
      console.log(message.sid);
    }
    done();
  });
};