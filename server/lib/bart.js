var qs = require('querystring');
var Promise = require('bluebird');
var _ = require('underscore');

var request = Promise.promisifyAll(require('request'));
var parseString = Promise.promisify(require('xml2js').parseString);

var BART_API_ENDPOINT = 'http://api.bart.gov/api/etd.aspx?cmd=etd&key=MW9S-E7SL-26DU-VV8V&';

var fetchDeparatureEstimates = function(orig, dir, dest) {
  var querystring = qs.stringify({
    orig: orig,
    dir: dir
  });

  var url = BART_API_ENDPOINT + querystring;
  console.log('Sending a request to ', url);

  return request.getAsync(url)
    .then(function(resp) {
      return parseString(resp[0].body)
        .then(function(json) {
          dest = dest.toUpperCase();
          var estimates = _.filter(json.root.station[0].etd, function (estimate) {
            if (estimate.abbreviation[0] === dest) {
              return estimate.estimate;
            }
          });

          if (estimates && estimates[0] && estimates[0].estimate) {
            estimates = estimates[0].estimate;
            return _.map(estimates, function (estimate) {
              return estimate.minutes[0] === 'Leaving' ? 'now': estimate.minutes[0];
            });
          }
        });
    });
};

exports.fetchDeparatureEstimates = fetchDeparatureEstimates;