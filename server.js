// set up ======================================================================
var express  = require('express');
var app      = express();
var mongoose = require('mongoose');
var port  	 = process.env.PORT || 8080;
var database = require('./config/database');
var morgan   = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

// configuration ===============================================================
//mongoose.connect(database.url);

app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(methodOverride('X-HTTP-Method-Override'));


// eventEmitter ===============================================================
var EventEmitter = require("events").EventEmitter;
var ee = new EventEmitter();


// Matching Data ===============================================================
var contentMatch = require('./app/contentMatch.js');


// Twitter API =================================================================
var Twit = require('twit');
 
var T = new Twit({
    consumer_key:         'rg76Slyob0dZxhcryJPgq7B7F',
  	consumer_secret:      '9geRiuXtpvotEKeg3IOsIaHJxV3bNxQKE9gwM4MckeRcNGnvQC',
  	access_token:         '3299964622-f9UOe9YriD9ntvPRLBXZTq3WfzRn8xsRKjaWpZE',
  	access_token_secret:  'laoNxPKxHA3rTmamRxrrMsMrkm10Q0Uh45TjEdfIheXD6'
});

ee.on("getNewTwitterData", function () {
    console.log("event has occured!! get me some new twitter data!!");
    // Twitter Data ================================================================
	require('./app/tweets.js')(T, contentMatch);
});


// GMAIL =======================================================================
/* 
var Imap = require('imap'),
    inspect = require('util').inspect;
 
var imap = new Imap({
  user: 'competitivecollection@gmail.com',
  password: 'Competitivecollection1',
  host: 'imap.gmail.com',
  port: 993,
  tls: true
});

// GMAIL Data ==================================================================
require('./app/gmail.js')(imap);
*/

// routes ======================================================================
require('./app/routes.js')(app, ee);


// listen (start app with node server.js) ======================================
app.listen(port);
console.log("App listening on port " + port);
