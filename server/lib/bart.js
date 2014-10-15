var qs = require('querystring');
var parseString = require('xml2js').parseString;
var request = require('request');
var _ = require('underscore');

var bartApiEndpoint = 'http://api.bart.gov/api/etd.aspx?cmd=etd&key=MW9S-E7SL-26DU-VV8V&';

var fetchDepartureInfo = function(orig, dir, dest, cb) {
  var querystring = qs.stringify({
    orig: orig,
    dir: dir
  });

  var url = bartApiEndpoint + querystring;
  console.log('Sending a request to ', url);

  request(url, function (err, resp, body) {
    if (err) throw err;

    var xml = body;

    parseString(xml, function (err, json) {
      var estimates = _.filter(json.root.station[0].etd, function (estimate) {
        if (estimate.abbreviation[0] === dest.toUpperCase()) {
          return estimate.estimate;
        }
      });

      if (estimates && estimates[0] && estimates[0].estimate) {
        estimates = estimates[0].estimate;
        var minutes = _.map(estimates, function (estimate) {
          return estimate.minutes[0];
        });

        cb(minutes);
      }
    });
  });
};

exports.fetchDepartureInfo = fetchDepartureInfo;