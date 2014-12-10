var stations = {
  '12th': '12th St. Oakland City Center',
  '16th': '16th St. Mission (SF)',
  '19th': '19th St. Oakland',
  '24th': '24th St. Mission (SF)',
  'ashb': 'Ashby (Berkeley)',
  'balb': 'Balboa Park (SF)',
  'bayf': 'Bay Fair (San Leandro)',
  'cast': 'Castro Valley',
  'civc': 'Civic Center (SF)',
  'cols': 'Coliseum/Oakland Airport',
  'embr': 'Embarcadero (SF)',
  'daly': 'Daly City',
  'plza': 'El Cerrito Plaza',
  'nbrk': 'North Berkeley',
  'wcrk': 'Walnut Creek',
  'frmt': 'Fremont',
  'phil': 'Pleasant Hill',
  'powl': 'Powell St. (SF)',
  'ssan': 'South San Francisco',
  'glen': 'Glen Park (SF)',
  'mont': 'Montgomery St. (SF)',
  'rich': 'Richmond',
  'sfia': 'San Francisco Int\'l Airport',
  'mlbr': 'Millbrae',
  'dubl': 'Dublin/Pleasanton',
  'pitt': 'Pittsburg/Bay Point'
};

module.exports = {
  invalidMethodHandler: function(req, res, next) {
    res.send(405, { message: "Method not allowed" });
  },

  errorLogger: function(error, req, res, next) {
    console.error(error.stack);
    next(error);
  },

  errorHandler: function(error, req, res, next) {
    var errorCode = error.status ? error.status : 500;
    res.send(errorCode, {error: error.message});
  },

  getStationName: function(abbr) {
    return !stations[abbr] ? 'unknown station': stations[abbr];
  }
};