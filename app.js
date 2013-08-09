/**
 * @author Maks Babenko <mbabenko21@gmail.com>
 */

var express = require('express'),
	jade = require('jade'),
	mongoose = require('mongoose'),
	routes = require('./routes'),
	user = require('./routes/user'),
	http = require('http'),
	path = require('path'),
	mongeStore = require("connect-mongodb"),
	connectTimeout = require('connect-timeout'),
	eventEmitter = require('events').EventEmitter,
	config = require('./lib/ld2/config'),
	locale = require('./lib/ld2/locale'),
	Router = require('./lib/ld2/router'),
	db;

var app = express();
app.set('config_path', path.join(__dirname, 'resources/config.yml'));

// all environments
app.set('config', config.Config(app.get('config_path')));
app.set("locale", locale.Translations(app.get("config").getLocale()));
app.set('port', process.env.PORT || 1489);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.use(express.favicon());
app.use(express.logger({
	format: '\x1b[1m:method\x1b[0m \x1b[33m:url\x1b[0m :response-time ms'
}))
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
	app.use(express.errorHandler());
}

app.configure('development', function() {
	app.set('db-uri', app.get("config").getConfig("mongodb").dev);
});

app.configure('test', function() {
	app.set('db-uri', app.get("config").getConfig("mongodb").test);
});

app.configure('production', function() {
	app.set('db-uri', app.get("config").getConfig("mongodb").prod);
});

db = mongoose.connect(app.set('db-uri'));
Router.init(app);

var server = http.createServer(app).listen(app.get('port'), function() {
	console.log('\x1b[33mServer listening on port \x1b[1m' + app.get('port') + '\x1b[0m');
	console.log('\x1b[1m---\x1b[0m\n\x1b[33mExpress\x1b[0m \x1b[1m%s\x1b[0m\n\x1b[33mJade\x1b[0m \x1b[1m%s\x1b[0m\n\x1b[33mMongoose\x1b[0m \x1b[1m%s\x1b[0m', express.version, jade.version, mongoose.version);
});

var io = require('socket.io').listen(server);