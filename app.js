'use strict';

var express = require('express'),
  path = require('path');

var app = express();

app.set('port', process.env.PORT || 3000);

// For production serve files from 'dist' directory
// localhost:3000/production/
app.use('/production', express.static(path.join(__dirname, 'dist')));

// For development serve files from 'app' and 'bower_components' directories
// localhost:3000/
app.use('/bower_components', express.static(path.join(__dirname, 'bower_components')));
app.use('/performance_data', express.static(path.join(__dirname, 'performance_data')));
app.use(express.static(path.join(__dirname, 'app')));

var port = app.get('port');
app.listen(port, function () {
  console.log('Express server listening on port ' + port);
});
