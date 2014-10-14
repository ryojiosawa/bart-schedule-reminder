var _ = require('underscore');
var accountSid = process.env.TWILIO_ACCOUNT_ID;
var authToken = process.env.AUTH_TOKEN;
var from = process.env.PHONE;

//require the Twilio module and create a REST client
var client = require('twilio')(accountSid, authToken);

exports.sendText = function(to, dest, minutes, cb) {

  minutes = _.map(minutes, function(minute) {
    return minute === 'Leaving' ? 'now' : minute;
  });

  var body = 'Your train (' + dest + ') ' +
        'is arriving at Powell station in [' +
        minutes.join(', ') +
        '] minutes.';

  var message = {
    to: to,
    from: from,
    body: body
  };

  client.messages.create(message, function(err, message) {
    console.log(message.sid);

    if (cb) {
      cb();
    }
  });
};
