var qs = require('querystring');
var Promise = require('bluebird');
var request = Promise.promisifyAll(require('request'));
var parseString = Promise.promisify(require('xml2js').parseString);

var BART_API_ENDPOINT = 'http://api.bart.gov/api/etd.aspx?cmd=etd&key=MW9S-E7SL-26DU-VV8V&';

var fetchDeparatureEstimates = function(orig, dir) {
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
          return json.root.station[0].etd;
        });
    });
};

exports.fetchDeparatureEstimates = fetchDeparatureEstimates;