var app = require('./server/server-config.js');

var port = process.env.PORT || 8000;
app.listen(port);

console.log('Server now listening on port ' + port);

// export our app for testing and flexibility, required by index.js
module.exports = app;