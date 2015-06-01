var Tweet = require('./models/tweet');

function getTweets(res){
	Tweet.find(function(err, tweets) {

			if (err)
				res.send(err)

			res.json(tweets);
		});
};

module.exports = function(app, ee) {

	// api ---------------------------------------------------------------------
	app.get('/api/getNewTwitterData', function(req, res) {
		ee.emit('getNewTwitterData');
		res.sendfile('./public/success.html');
	});

	app.get('/api/tweets', function(req, res) {
		getTweets(res);
	});

	// application -------------------------------------------------------------
	app.get('*', function(req, res) {
		res.sendfile('./public/index.html');
	});
};