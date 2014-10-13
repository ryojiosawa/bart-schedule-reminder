var qs = require('querystring');
var Promise = require('bluebird');
var util = require('util');
/*var request = Promise.promisifyAll(require('request'));*/
/*var parseString = Promise.promisifyAll(require('xml2js').parseString);*/
var request = require('request');
var parseString = require('xml2js').parseString;
var twilio = require('./twilio');

var bartApiEndpoint = 'http://api.bart.gov/api/etd.aspx?cmd=etd&key=MW9S-E7SL-26DU-VV8V&';

exports.getDepartureInfo = function(orig, dir) {
  var querystring = qs.stringify({
    orig: orig,
    dir: dir
  });
  var url = bartApiEndpoint + querystring;

  console.log('Sending a request to ', url);
  request(url, function(err, resp, body) {
    if (err) throw err;

    parseString(body, function(err, result) {
      if (err) throw err;

      var station = result.root.station[0];
      var etd = station.etd[0];
      var estimate = etd.estimate;
      console.log('estimate', util.inspect(estimate, false, null));
      console.log('Your next train is leaving at Powell station in', estimate[0].minutes[0], 'minutes');
      twilio.sendText('415-724-9329', estimate[0].minutes[0]);
    });
  });
};

