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


// GMAIL ======================================================================
var Imap = require('imap'),
    inspect = require('util').inspect;
 
var imap = new Imap({
  user: 'competitivecollection@gmail.com',
  password: 'Competitivecollection1',
  host: 'imap.gmail.com',
  port: 993,
  tls: true
});
 
function openInbox(cb) {
  imap.openBox('INBOX', true, cb);
}
 
imap.once('ready', function() {
  openInbox(function(err, box) {
    if (err) throw err;
    var f = imap.seq.fetch('1:3', {
      bodies: 'HEADER.FIELDS (FROM TO SUBJECT DATE)',
      struct: true
    });
    f.on('message', function(msg, seqno) {
      console.log('Message #%d', seqno);
      var prefix = '(#' + seqno + ') ';
      msg.on('body', function(stream, info) {
        var buffer = '';
        stream.on('data', function(chunk) {
          buffer += chunk.toString('utf8');
        });
        stream.once('end', function() {
          console.log(prefix + 'Parsed header: %s', inspect(Imap.parseHeader(buffer)));
        });
      });
      msg.once('attributes', function(attrs) {
        console.log(prefix + 'Attributes: %s', inspect(attrs, false, 8));
      });
      msg.once('end', function() {
        console.log(prefix + 'Finished');
      });
    });
    f.once('error', function(err) {
      console.log('Fetch error: ' + err);
    });
    f.once('end', function() {
      console.log('Done fetching all messages!');
      imap.end();
    });
  });
});
 
imap.once('error', function(err) {
  console.log(err);
});
 
imap.once('end', function() {
  console.log('Connection ended');
});
 
imap.connect();


// listen (start app with node server.js) ======================================
app.listen(port);
console.log("App listening on port " + port);
