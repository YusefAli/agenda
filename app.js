// My SocketStream 0.3 app

var http = require('http'),
    ss = require('socketstream'),
    express  = require("express"),
    app      = express(),
    server   = http.createServer(app)
    mongoose = require('mongoose'); 

// Define a single-page client called 'main'
ss.client.define('main', {
  view: 'app.html',
  css:  ['app.css'],
  code: ['libs/jquery.min.js', 'app'],
  tmpl: '*'
});

ss.client.define('parla', {
  view: 'app.html',
  css:  ['app.css'],
  code: ['libs/jquery.min.js', 'appParla'],
  tmpl: '*'
});

ss.client.define('parla2', {
  view: 'app.html',
  css:  ['app.css'],
  code: ['libs/jquery.min.js', 'appParla2'],
  tmpl: '*'
});

ss.client.define('parlaEntrada', {
  view: 'appEntrada.html',
  css:  ['libs/appEntrada.css'],
  code: ['libs/jquery.min.js', 'appParlaEntrada'],
  tmpl: '*'
});

// Serve this client on the root URL
ss.http.route('/', function(req, res){
  res.serveClient('main');
});

ss.http.route('/parla', function(req, res){
  res.serveClient('parla');
});

ss.http.route('/parla2', function(req, res){
  res.serveClient('parla2');
});

ss.http.route('/parlaEntrada', function(req, res){
  res.serveClient('parlaEntrada');
});

// Use server-side compiled Hogan (Mustache) templates. Others engines available
ss.client.templateEngine.use(require('ss-hogan'));

//ss.publish.transport.use('redis',{host: 'pub-redis-15488.us-west-2-1.1.ec2.garantiadata.com', port: 15488, pass: 'Orezipal1'});
//ss.session.store.use('redis',{host: 'pub-redis-15488.us-west-2-1.1.ec2.garantiadata.com', port: 15488, pass: 'Orezipal1'});

// Minimize and pack assets if you type: SS_ENV=production node app.js
if (ss.env === 'production') ss.client.packAssets();

// Start web server
//var server = http.Server(ss.http.middleware);


app.configure(function () {
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(ss.http.middleware);
});


routes = require('./routes/agenda')(app,ss);


mongoose.connect('mongodb://localhost/agenda', function(err, res) {

//mongoose.connect('mongodb://wellcare:wellcare@ds055792.mongolab.com:55792/agenda', function(err, res) {
	if(err) {
		console.log('ERROR: connecting to Database. ' + err);
	} else {
		console.log('Connected to Database');
	}
});



server.listen(process.env.PORT || 8080, function() {
  console.log("Node server running on"+ 8080);
});

// Start SocketStream
ss.start(server);
