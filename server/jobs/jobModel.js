var mongoose = require('mongoose');

var JobSchema = new mongoose.Schema({
  phone: { type: String, required: true },
  station: { type: String, required: true },
  destination: { type: String, required: true },
  direction: { type: String, required: true }
});

module.exports = mongoose.model('Job', JobSchema);