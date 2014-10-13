// Twilio Credentials
var _ = require('underscore');
var accountSid = 'ACca9e3c2a49c5ee9d18dca2636da601aa';
var authToken = '200751a731f2ba8e2b193d2175ef2585';
var from = "+14152756980";

//require the Twilio module and create a REST client
var client = require('twilio')(accountSid, authToken);

exports.sendText = function(to, dest, minutes) {

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
  });
};
