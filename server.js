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
mongoose.connect(database.url);

app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(methodOverride('X-HTTP-Method-Override'));


// Twitter Data ================================================================
var Twit = require('twit');
 
var T = new Twit({
    consumer_key:         'rg76Slyob0dZxhcryJPgq7B7F',
  	consumer_secret:      '9geRiuXtpvotEKeg3IOsIaHJxV3bNxQKE9gwM4MckeRcNGnvQC',
  	access_token:         '3299964622-f9UOe9YriD9ntvPRLBXZTq3WfzRn8xsRKjaWpZE',
  	access_token_secret:  'laoNxPKxHA3rTmamRxrrMsMrkm10Q0Uh45TjEdfIheXD6'
});


// routes ======================================================================
require('./app/routes.js')(app);


/* Search Tweets
T.get('search/tweets', { q: 'blue apron since:2015-05-29', count: 100 }, function(err, data, response) {
  console.log(data);
});
*/

/* Home Timeline
T.get('statuses/home_timeline', { count: 100 }, function(err, data, response) {
  console.log(data);
});
*/

/* Get Suggested Users
T.get('users/suggestions/:slug', { slug: 'meal kit' }, function (err, data, response) {
  console.log(data)
});
*/


// listen (start app with node server.js) ======================================
app.listen(port);
console.log("App listening on port " + port);
