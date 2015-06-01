var Tweet = require('./models/tweet');

// Get Twitter Data ==============================================================
module.exports = function(T, contentMatch) {

  // Matching Keywords ===========================================================
  var cMatch = contentMatch.getContentMatchObject();
  var platedMatch = contentMatch.getPlatedMatchObject();
  var companyMatch = contentMatch.getCompanyMatch(platedMatch);

  // Helper Functions ==============================================================
  function ContainsAny(str, items){
      for(var i in items){
          var item = items[i];
          //added toLowerCase for case insensitive
          if (str.toLowerCase().indexOf(item) > -1){
              return item;
          }

      }
      return false;
  } // end ContainsAny

  function saveTweetObject(tweet, matchedWord, matchType) {
    //console.log(tweet);
    var urls_array = [];
    tweet.entities.urls.forEach(function(element, index) {
      urls_array.push(element.expanded_url);
    });

    //TODO: tweet.entities.hashtags - for each hashtag in hashtags... hashtags.push(hashtag.text)
    //TODO: tweet.entities.user_mentions - for each user in mentions... user_mentions.push({ name: user.name, id: user.id })
    //TODO: smart way to figure out specific competitor

    var keywords_array = [matchedWord];
  
    var t = new Tweet();

    t.created_at = tweet.created_at;
    t.tweet_id = tweet.id;
    t.text = tweet.text;
    t.t_user_id = tweet.user.id;
    t.t_screen_name = tweet.user.screen_name;
    t.urls = urls_array;
    //t.hashtags = ;
    //t.user_mentions = ;
    t.portfolio_company = 'Plated';
    t.key_words = keywords_array;
    t.match_type = matchType;
    t.date_added = new Date();

    t.save(function(err) {
        if (err)
            res.send(err);

        console.log('added tweet to db!');
    });

  } // end saveTweetObject

  function getWordMatch(element, wordArray, matchType) {
    var matchedWord = ContainsAny(element.text, wordArray);
    if (matchedWord != false) {
      saveTweetObject(element, matchedWord, matchType);
    }
  } // end getWordMatch

  function logArrayElements(element, index, array) {
    //console.log('a[' + index + '] = ' + element.text);
    getWordMatch(element, cMatch.product_marketing, 'product_marketing');
    getWordMatch(element, cMatch.market_funding, 'market_funding');
    getWordMatch(element, cMatch.status_growth, 'status_growth');
    getWordMatch(element, platedMatch.keywords, 'keyword');
    getWordMatch(element, companyMatch, 'competitor_leaders');
  } // end logArrayElements function

  /* Search Tweets
  T.get('search/tweets', { q: 'blue apron since:2015-05-29', count: 100 }, function(err, data, response) {
    console.log(data);
  });
  */

  /* Home Timeline */
  T.get('statuses/home_timeline', { count: 1000 }, function(err, data, response) {
    //console.log(data);
    data.forEach(logArrayElements);
  });

  /* Get Suggested Users
  T.get('users/suggestions/:slug', { slug: 'meal kit' }, function (err, data, response) {
    console.log(data)
  });
  */

} // end module exports