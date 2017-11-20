// run.js - configure and start the application.
var router = require('./routes/routes');
var index = require('./routes/index');
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

app.get(index);
app.use(router);

// static files.
app.use(express.static(path.join(__dirname, 'public')));

app.set('host', host || "localhost");
app.set('port', port || 8000);

// listening application.
app.listen(app.get('port'), () => {
	console.log('[*] - App started in %s:%s', app.get('host'), app.get('port'));
});