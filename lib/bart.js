var qs = require('querystring');
var Promise = require('bluebird');
var util = require('util');
var parseString = require('xml2js').parseString;
var request = require('request');
var twilio = require('/lib/twilio');

var bartApiEndpoint = 'http://api.bart.gov/api/etd.aspx?cmd=etd&key=MW9S-E7SL-26DU-VV8V&';

request = Promise.promisify(request);
parseString = Promise.promisify(parseString);

var fetchDepartureInfo = function(orig, dir) {
  var querystring = qs.stringify({
    orig: orig,
    dir: dir
  });

  var url = bartApiEndpoint + querystring;
  console.log('Sending a request to ', url);

  request(url)
    .then(function (resp) {
      return resp[0].body;
    })
    .then(function(xml) {
      parseString(xml)
        .then(function(json) {
          console.log(json.root.station[0]);
        });
    })
    .catch(function (err) {
      console.error(err);
    });
};

exports.fetchDepartureInfo = fetchDepartureInfo;