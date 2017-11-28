// run.js - configure and start the application.
var host = require('./config/app.json').host;
var port = require('./config/app.json').port;

// create our app with express.
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

// configure all environments.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var index = require('./routes/index');
app.get(index);

var router = require('./routes/routes');
app.use(router);

var machine = require('./routes/machine');
app.use(machine);

var inputs = require('./routes/input');
app.use(inputs);

// static files.
app.use(express.static(path.join(__dirname, 'public')));

app.set('host', host || "localhost");
app.set('port', port || 8000);

// listening application.
app.listen(app.get('port'), () => {
	console.log('[*] - App started in %s:%s', app.get('host'), app.get('port'));
});