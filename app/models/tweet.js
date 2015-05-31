var mongoose = require('mongoose');

var tweetSchema = mongoose.Schema({

	created_at			: String,
	tweet_id			: Number,
	text				: String,
	t_user_id			: Number,
	t_user_name			: String,
	urls 				: { type : Array , "default" : [] },
	hashtags			: { type : Array , "default" : [] },
	user_mentions		: { type : Array , "default" : [] },
	portfolio_company	: String,
	competitor			: String,
	key_words			: { type : Array , "default" : [] },
	date_added			: Date

});

module.exports = mongoose.model('Tweet', tweetSchema);